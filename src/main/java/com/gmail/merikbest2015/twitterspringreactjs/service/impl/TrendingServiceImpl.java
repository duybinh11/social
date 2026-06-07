package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.UserInteractionEvent;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserInteractionEventRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.TrendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TrendingServiceImpl implements TrendingService {

    private static final Pattern TAG_PATTERN = Pattern.compile("(#\\w+)\\b");
    private static final double TWEET_WEIGHT = 3.0;
    private static final double LIKE_WEIGHT = 1.0;
    private static final double RETWEET_WEIGHT = 2.0;
    private static final double COMMENT_WEIGHT = 2.5;

    private final TweetRepository tweetRepository;
    private final UserInteractionEventRepository userInteractionEventRepository;

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getNormalizedTrendScores24h() {
        LocalDateTime now = LocalDateTime.now();
        Map<String, Double> current = aggregateEngagement(now.minusHours(24), now);
        Map<String, Double> previous = aggregateEngagement(now.minusHours(48), now.minusHours(24));

        Map<String, Double> rawScores = new HashMap<>();
        Set<String> allTags = new HashSet<>(current.keySet());
        allTags.addAll(previous.keySet());

        for (String tag : allTags) {
            double engagement = current.getOrDefault(tag, 0.0);
            if (engagement <= 0.0) {
                continue;
            }
            double prevEngagement = previous.getOrDefault(tag, 0.0);
            double velocity = engagement / Math.max(prevEngagement, 1.0);
            rawScores.put(tag, engagement * Math.log(1.0 + velocity));
        }
        return normalizeScores(rawScores);
    }

    @Override
    public double trendBoostForTags(Set<String> tags, Map<String, Double> trendScores) {
        if (tags.isEmpty() || trendScores.isEmpty()) {
            return 0.0;
        }
        return tags.stream()
                .mapToDouble(tag -> trendScores.getOrDefault(tag, 0.0))
                .max()
                .orElse(0.0);
    }

    private Map<String, Double> aggregateEngagement(LocalDateTime from, LocalDateTime to) {
        Map<String, Double> engagement = new HashMap<>();

        List<Tweet> tweets = tweetRepository.findTweetsPostedBetween(from, to);
        for (Tweet tweet : tweets) {
            for (String tag : extractHashtags(tweet.getText())) {
                engagement.merge(tag, TWEET_WEIGHT, Double::sum);
            }
        }

        List<UserInteractionEvent> events = userInteractionEventRepository.findByEventTimeBetween(from, to);
        for (UserInteractionEvent event : events) {
            if (event.getTweet() == null) {
                continue;
            }
            double weight = interactionWeight(event.getInteractionType());
            for (String tag : extractHashtags(event.getTweet().getText())) {
                engagement.merge(tag, weight, Double::sum);
            }
        }
        return engagement;
    }

    private double interactionWeight(InteractionType type) {
        switch (type) {
            case LIKE:
                return LIKE_WEIGHT;
            case RETWEET:
                return RETWEET_WEIGHT;
            case COMMENT:
                return COMMENT_WEIGHT;
            case READ:
                return 1.5;
            case SAVE:
                return 2.0;
            case CLICK:
                return 0.5;
            default:
                return LIKE_WEIGHT;
        }
    }

    private Set<String> extractHashtags(String text) {
        Set<String> tags = new HashSet<>();
        if (text == null || text.isBlank()) {
            return tags;
        }
        Matcher matcher = TAG_PATTERN.matcher(text.toLowerCase());
        while (matcher.find()) {
            tags.add(matcher.group(1).replace("#", ""));
        }
        return tags;
    }

    private Map<String, Double> normalizeScores(Map<String, Double> rawScores) {
        if (rawScores.isEmpty()) {
            return rawScores;
        }
        double max = rawScores.values().stream().mapToDouble(Double::doubleValue).max().orElse(1.0);
        if (max <= 0.0) {
            return rawScores;
        }
        Map<String, Double> normalized = new HashMap<>();
        rawScores.forEach((tag, score) -> normalized.put(tag, score / max));
        return normalized;
    }
}
