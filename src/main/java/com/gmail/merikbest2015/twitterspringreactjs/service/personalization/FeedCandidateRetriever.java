package com.gmail.merikbest2015.twitterspringreactjs.service.personalization;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedCandidateRetriever {

    private static final int TARGET_POOL_SIZE = 1000;
    private static final int SOURCE_LIMIT = 280;

    private final TweetRepository tweetRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Tweet> retrieveCandidates(Long userId, Set<Long> mutedUserIds, Map<String, Double> recentTagScores,
                                          Map<String, Double> longTermTagScores, Map<String, Double> trendScores) {
        Map<Long, Tweet> merged = new LinkedHashMap<>();

        List<Long> followingIds = userRepository.getFollowingIdsByUserId(userId);
        if (!followingIds.isEmpty()) {
            mergeTweets(merged, tweetRepository.findCandidateTweetsByUserIds(
                    followingIds, PageRequest.of(0, SOURCE_LIMIT)), mutedUserIds);
        }

        List<String> retrievalTags = selectRetrievalTags(recentTagScores, longTermTagScores, trendScores);
        if (!retrievalTags.isEmpty()) {
            mergeTweets(merged, tweetRepository.findCandidateTweetsByTagNames(
                    retrievalTags, PageRequest.of(0, SOURCE_LIMIT)), mutedUserIds);
        }

        List<Tweet> recentPool = loadRecentPool(mutedUserIds, SOURCE_LIMIT * 2);
        recentPool.stream()
                .sorted(Comparator.comparingDouble(this::engagementScore).reversed())
                .limit(SOURCE_LIMIT)
                .forEach(tweet -> mergeTweet(merged, tweet, mutedUserIds));

        mergeTweets(merged, recentPool.stream().limit(SOURCE_LIMIT).collect(Collectors.toList()), mutedUserIds);

        return merged.values().stream()
                .limit(TARGET_POOL_SIZE)
                .collect(Collectors.toList());
    }

    private List<Tweet> loadRecentPool(Set<Long> mutedUserIds, int limit) {
        if (mutedUserIds.isEmpty()) {
            return tweetRepository.findCandidateTweets(PageRequest.of(0, limit));
        }
        return tweetRepository.findCandidateTweetsExcludingUsers(new ArrayList<>(mutedUserIds), PageRequest.of(0, limit));
    }

    private List<String> selectRetrievalTags(Map<String, Double> recentTagScores, Map<String, Double> longTermTagScores,
                                             Map<String, Double> trendScores) {
        List<String> tags = new ArrayList<>();
        recentTagScores.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(10)
                .map(Map.Entry::getKey)
                .forEach(tags::add);
        longTermTagScores.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(8)
                .map(Map.Entry::getKey)
                .forEach(tag -> {
                    if (!tags.contains(tag)) {
                        tags.add(tag);
                    }
                });
        trendScores.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(8)
                .map(Map.Entry::getKey)
                .forEach(tag -> {
                    if (!tags.contains(tag)) {
                        tags.add(tag);
                    }
                });
        return tags.stream().limit(20).collect(Collectors.toList());
    }

    private void mergeTweets(Map<Long, Tweet> merged, List<Tweet> tweets, Set<Long> mutedUserIds) {
        for (Tweet tweet : tweets) {
            mergeTweet(merged, tweet, mutedUserIds);
        }
    }

    private void mergeTweet(Map<Long, Tweet> merged, Tweet tweet, Set<Long> mutedUserIds) {
        if (tweet == null || tweet.getId() == null) {
            return;
        }
        if (tweet.getUser() != null && mutedUserIds.contains(tweet.getUser().getId())) {
            return;
        }
        merged.putIfAbsent(tweet.getId(), tweet);
    }

    private double engagementScore(Tweet tweet) {
        double likes = tweet.getLikedTweets() == null ? 0.0 : tweet.getLikedTweets().size();
        double retweets = tweet.getRetweets() == null ? 0.0 : tweet.getRetweets().size();
        double replies = tweet.getReplies() == null ? 0.0 : tweet.getReplies().size();
        return likes + (1.5 * retweets) + (2.0 * replies);
    }
}
