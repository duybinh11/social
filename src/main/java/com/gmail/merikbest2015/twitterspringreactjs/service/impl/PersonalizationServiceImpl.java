package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.TweetEmbedding;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.model.UserInteractionEvent;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetEmbeddingRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserInteractionEventRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.PersonalizationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TrendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonalizationServiceImpl implements PersonalizationService {

    private static final List<String> IT_TAGS = List.of(
            "java", "spring", "react", "dsa", "devops", "database", "career", "cpp", "python", "javascript",
            "typescript", "ai", "ml", "oop", "api", "docker", "kubernetes", "sql", "nosql", "git"
    );
    private static final Pattern TAG_PATTERN = Pattern.compile("(#\\w+)\\b");

    private static final double WEIGHT_SEMANTIC_SIMILARITY = 0.35;
    private static final double WEIGHT_TREND_BOOST_24H = 0.15;
    private static final double WEIGHT_FRESHNESS = 0.15;
    private static final double WEIGHT_POPULARITY = 0.15;
    private static final double WEIGHT_SOCIAL_GRAPH = 0.10;
    private static final double WEIGHT_TAG_AFFINITY = 0.10;

    private static final double DIVERSITY_TAG_PENALTY = 0.05;
    private static final double DIVERSITY_AUTHOR_PENALTY = 0.15;
    private static final int MAX_TWEETS_PER_AUTHOR_BEFORE_PENALTY = 2;

    private final AuthenticationService authenticationService;
    private final TweetRepository tweetRepository;
    private final TweetEmbeddingRepository tweetEmbeddingRepository;
    private final UserInteractionEventRepository userInteractionEventRepository;
    private final UserRepository userRepository;
    private final TrendingService trendingService;

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getPersonalizedTweets(Pageable pageable) {
        Long userId;
        try {
            userId = authenticationService.getAuthenticatedUserId();
        } catch (Exception exception) {
            return tweetRepository.findAllTweets(pageable);
        }
        List<Tweet> candidates = tweetRepository.findCandidateTweets(PageRequest.of(0, 300));
        if (candidates.isEmpty()) {
            return Page.empty(pageable);
        }

        List<UserInteractionEvent> interactions = userInteractionEventRepository.findRecentByUserId(userId);
        if (interactions.isEmpty()) {
            return fallbackByRecency(candidates, pageable);
        }

        Map<String, Double> userTagScore = buildUserTagScore(interactions);
        double[] userVector = buildUserVector(interactions);
        Map<String, Double> trendScores24h = trendingService.getNormalizedTrendScores24h();
        Set<Long> followingIds = new HashSet<>(userRepository.getFollowingIdsByUserId(userId));
        Map<Long, ScoredTweet> scored = new HashMap<>();

        for (Tweet tweet : candidates) {
            double[] tweetVector = getOrBuildTweetVector(tweet);
            double semanticSimilarity = cosineSimilarity(userVector, tweetVector);
            Set<String> tweetTags = extractTags(tweet.getText());
            Long authorId = tweet.getUser() == null ? null : tweet.getUser().getId();

            double baseScore = (WEIGHT_SEMANTIC_SIMILARITY * semanticSimilarity)
                    + (WEIGHT_TREND_BOOST_24H * trendingService.trendBoostForTags(tweetTags, trendScores24h))
                    + (WEIGHT_FRESHNESS * freshnessScore(tweet.getDateTime()))
                    + (WEIGHT_POPULARITY * popularityScore(tweet))
                    + (WEIGHT_SOCIAL_GRAPH * socialGraphScore(authorId, followingIds))
                    + (WEIGHT_TAG_AFFINITY * tagAffinityScore(tweetTags, userTagScore));

            scored.put(tweet.getId(), new ScoredTweet(tweet, tweetTags, authorId, baseScore));
        }

        List<ScoredTweet> ranked = applyDiversityAndSort(scored.values(), pageable.getOffset() + pageable.getPageSize());
        List<TweetProjection> pageItems = ranked.stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .map(item -> tweetRepository.findTweetById(item.tweet().getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new PageImpl<>(pageItems, pageable, scored.size());
    }

    @Override
    @Transactional
    public void indexTweetEmbedding(Long tweetId) {
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tweet not found for embedding"));
        double[] vector = buildEmbedding(tweet.getText());
        String serialized = serializeVector(vector);
        TweetEmbedding embedding = tweetEmbeddingRepository.findByTweet_Id(tweetId).orElseGet(TweetEmbedding::new);
        embedding.setTweet(tweet);
        embedding.setVectorData(serialized);
        embedding.setUpdatedAt(LocalDateTime.now().withNano(0));
        tweetEmbeddingRepository.save(embedding);
    }

    @Override
    @Transactional
    public void trackInteraction(Long tweetId, InteractionType interactionType, Integer dwellSeconds) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tweet not found for event"));
        UserInteractionEvent event = new UserInteractionEvent();
        event.setUser(user);
        event.setTweet(tweet);
        event.setInteractionType(interactionType);
        event.setDwellSeconds(dwellSeconds);
        userInteractionEventRepository.save(event);
    }

    private Page<TweetProjection> fallbackByRecency(List<Tweet> candidates, Pageable pageable) {
        List<TweetProjection> items = candidates.stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .map(tweet -> tweetRepository.findTweetById(tweet.getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new PageImpl<>(items, pageable, candidates.size());
    }

    private Map<String, Double> buildUserTagScore(List<UserInteractionEvent> interactions) {
        Map<String, Double> scores = new HashMap<>();
        for (UserInteractionEvent event : interactions.stream().limit(600).collect(Collectors.toList())) {
            double eventWeight = interactionWeight(event.getInteractionType());
            double recencyMultiplier = recencyMultiplier(event.getEventTime());
            Set<String> tags = extractTags(event.getTweet().getText());
            for (String tag : tags) {
                scores.merge(tag, eventWeight * recencyMultiplier, Double::sum);
            }
        }
        return scores;
    }

    private double[] buildUserVector(List<UserInteractionEvent> interactions) {
        double[] vector = new double[IT_TAGS.size()];
        double totalWeight = 0.0;
        for (UserInteractionEvent event : interactions.stream().limit(400).collect(Collectors.toList())) {
            double weight = interactionWeight(event.getInteractionType()) * recencyMultiplier(event.getEventTime());
            double[] eventVector = getOrBuildTweetVector(event.getTweet());
            for (int i = 0; i < vector.length; i++) {
                vector[i] += eventVector[i] * weight;
            }
            totalWeight += weight;
        }
        if (totalWeight > 0) {
            for (int i = 0; i < vector.length; i++) {
                vector[i] /= totalWeight;
            }
        }
        return normalize(vector);
    }

    private double[] getOrBuildTweetVector(Tweet tweet) {
        Optional<TweetEmbedding> existing = tweetEmbeddingRepository.findByTweet_Id(tweet.getId());
        if (existing.isPresent()) {
            return deserializeVector(existing.get().getVectorData());
        }
        return normalize(buildEmbedding(tweet.getText()));
    }

    private double[] buildEmbedding(String text) {
        double[] vector = new double[IT_TAGS.size()];
        String normalized = text == null ? "" : text.toLowerCase(Locale.ROOT);
        for (int i = 0; i < IT_TAGS.size(); i++) {
            String token = IT_TAGS.get(i);
            int count = countOccurrences(normalized, token);
            vector[i] = count;
        }
        Set<String> hashtags = extractTags(normalized);
        for (String hashtag : hashtags) {
            int idx = IT_TAGS.indexOf(hashtag);
            if (idx >= 0) {
                vector[idx] += 2.0;
            }
        }
        return normalize(vector);
    }

    private int countOccurrences(String source, String token) {
        int count = 0;
        int index = 0;
        while (index != -1) {
            index = source.indexOf(token, index);
            if (index != -1) {
                count++;
                index += token.length();
            }
        }
        return count;
    }

    private Set<String> extractTags(String text) {
        Set<String> tags = new HashSet<>();
        String normalized = text == null ? "" : text.toLowerCase(Locale.ROOT);
        Matcher matcher = TAG_PATTERN.matcher(normalized);
        while (matcher.find()) {
            String tag = matcher.group(1).replace("#", "");
            tags.add(tag);
        }
        for (String knownTag : IT_TAGS) {
            if (normalized.contains(knownTag)) {
                tags.add(knownTag);
            }
        }
        return tags;
    }

    private double interactionWeight(InteractionType type) {
        switch (type) {
            case CLICK:
                return 1.0;
            case READ:
                return 2.0;
            case LIKE:
                return 3.0;
            case COMMENT:
                return 3.5;
            case SAVE:
                return 4.0;
            case RETWEET:
                return 2.5;
            default:
                return 1.0;
        }
    }

    private double recencyMultiplier(LocalDateTime eventTime) {
        long hours = Math.max(1, Duration.between(eventTime, LocalDateTime.now()).toHours());
        return 1.0 / Math.log(hours + 2.0);
    }

    private double freshnessScore(LocalDateTime tweetTime) {
        long hours = Math.max(0, Duration.between(tweetTime, LocalDateTime.now()).toHours());
        return Math.exp(-(double) hours / 72.0);
    }

    private double popularityScore(Tweet tweet) {
        double likes = tweet.getLikedTweets() == null ? 0.0 : tweet.getLikedTweets().size();
        double retweets = tweet.getRetweets() == null ? 0.0 : tweet.getRetweets().size();
        double replies = tweet.getReplies() == null ? 0.0 : tweet.getReplies().size();
        return 1.0 - Math.exp(-(likes + (1.5 * retweets) + (2.0 * replies)) / 10.0);
    }

    private double socialGraphScore(Long authorId, Set<Long> followingIds) {
        if (authorId == null || followingIds.isEmpty()) {
            return 0.0;
        }
        return followingIds.contains(authorId) ? 1.0 : 0.0;
    }

    private double tagAffinityScore(Set<String> tweetTags, Map<String, Double> userTagScore) {
        if (tweetTags.isEmpty() || userTagScore.isEmpty()) {
            return 0.0;
        }
        double matched = tweetTags.stream()
                .mapToDouble(tag -> userTagScore.getOrDefault(tag, 0.0))
                .sum();
        return matched / (matched + 5.0);
    }

    private List<ScoredTweet> applyDiversityAndSort(Collection<ScoredTweet> scoredTweets, long limit) {
        List<ScoredTweet> sorted = scoredTweets.stream()
                .sorted(Comparator.comparingDouble(ScoredTweet::baseScore).reversed())
                .collect(Collectors.toList());
        List<ScoredTweet> result = new ArrayList<>();
        Map<String, Integer> tagSeen = new HashMap<>();
        Map<Long, Integer> authorSeen = new HashMap<>();

        for (ScoredTweet candidate : sorted) {
            double tagPenalty = candidate.tags().stream()
                    .mapToInt(tag -> tagSeen.getOrDefault(tag, 0))
                    .sum() * DIVERSITY_TAG_PENALTY;
            double authorPenalty = 0.0;
            if (candidate.authorId() != null
                    && authorSeen.getOrDefault(candidate.authorId(), 0) >= MAX_TWEETS_PER_AUTHOR_BEFORE_PENALTY) {
                authorPenalty = DIVERSITY_AUTHOR_PENALTY;
            }
            double finalScore = candidate.baseScore() - tagPenalty - authorPenalty;
            result.add(new ScoredTweet(candidate.tweet(), candidate.tags(), candidate.authorId(), finalScore));

            for (String tag : candidate.tags()) {
                tagSeen.merge(tag, 1, Integer::sum);
            }
            if (candidate.authorId() != null) {
                authorSeen.merge(candidate.authorId(), 1, Integer::sum);
            }
            if (result.size() >= limit) {
                break;
            }
        }
        result.sort(Comparator.comparingDouble(ScoredTweet::baseScore).reversed());
        return result;
    }

    private double cosineSimilarity(double[] left, double[] right) {
        double dot = 0.0;
        double leftNorm = 0.0;
        double rightNorm = 0.0;
        for (int i = 0; i < left.length; i++) {
            dot += left[i] * right[i];
            leftNorm += left[i] * left[i];
            rightNorm += right[i] * right[i];
        }
        if (leftNorm == 0.0 || rightNorm == 0.0) {
            return 0.0;
        }
        return dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
    }

    private double[] normalize(double[] vector) {
        double norm = 0.0;
        for (double value : vector) {
            norm += value * value;
        }
        if (norm == 0.0) {
            return vector;
        }
        double denom = Math.sqrt(norm);
        double[] normalized = new double[vector.length];
        for (int i = 0; i < vector.length; i++) {
            normalized[i] = vector[i] / denom;
        }
        return normalized;
    }

    private String serializeVector(double[] vector) {
        return Arrays.stream(vector)
                .mapToObj(value -> String.format(Locale.ROOT, "%.8f", value))
                .collect(Collectors.joining(","));
    }

    private double[] deserializeVector(String vectorData) {
        String[] parts = vectorData.split(",");
        double[] vector = new double[parts.length];
        for (int i = 0; i < parts.length; i++) {
            vector[i] = Double.parseDouble(parts[i]);
        }
        return vector;
    }

    private static class ScoredTweet {
        private final Tweet tweet;
        private final Set<String> tags;
        private final Long authorId;
        private final double baseScore;

        private ScoredTweet(Tweet tweet, Set<String> tags, Long authorId, double baseScore) {
            this.tweet = tweet;
            this.tags = tags;
            this.authorId = authorId;
            this.baseScore = baseScore;
        }

        public Tweet tweet() {
            return tweet;
        }

        public Set<String> tags() {
            return tags;
        }

        public Long authorId() {
            return authorId;
        }

        public double baseScore() {
            return baseScore;
        }
    }
}
