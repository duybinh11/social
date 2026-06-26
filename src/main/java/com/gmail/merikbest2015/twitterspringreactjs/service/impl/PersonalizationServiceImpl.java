package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.TweetEmbedding;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.model.UserInteractionEvent;
import com.gmail.merikbest2015.twitterspringreactjs.repository.LikeTweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetEmbeddingRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserInteractionEventRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.MutedUsersFilterService;
import com.gmail.merikbest2015.twitterspringreactjs.service.PersonalizationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TrendingService;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.FeedCandidateRetriever;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.FeedPersona;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.RankingWeights;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.TagVocabularyService;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.UserInterestProfile;
import com.gmail.merikbest2015.twitterspringreactjs.service.personalization.UserInterestProfileBuilder;
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
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonalizationServiceImpl implements PersonalizationService {

    private static final int INTERACTION_LOOKBACK = 500;

    private final AuthenticationService authenticationService;
    private final TweetRepository tweetRepository;
    private final TweetEmbeddingRepository tweetEmbeddingRepository;
    private final UserInteractionEventRepository userInteractionEventRepository;
    private final UserRepository userRepository;
    private final TrendingService trendingService;
    private final MutedUsersFilterService mutedUsersFilterService;
    private final TagVocabularyService tagVocabularyService;
    private final FeedCandidateRetriever feedCandidateRetriever;
    private final LikeTweetRepository likeTweetRepository;
    private final UserInterestProfileBuilder userInterestProfileBuilder;

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getPersonalizedTweets(Pageable pageable) {
        Long userId;
        try {
            userId = authenticationService.getAuthenticatedUserId();
        } catch (Exception exception) {
            return tweetRepository.findAllTweets(pageable);
        }

        List<Long> mutedUserIds = mutedUsersFilterService.getMutedUserIdsForAuthUser();
        Set<Long> mutedUserIdSet = new HashSet<>(mutedUserIds);
        List<UserInteractionEvent> interactions = userInteractionEventRepository.findRecentByUserId(
                userId, PageRequest.of(0, INTERACTION_LOOKBACK));
        UserInterestProfile profile = userInterestProfileBuilder.build(interactions);
        Map<String, Double> trendScores24h = trendingService.getNormalizedTrendScores24h();

        List<Tweet> candidates = feedCandidateRetriever.retrieveCandidates(
                userId, mutedUserIdSet,
                profile.getRecentTagScores(),
                profile.getLongTermTagScores(),
                trendScores24h);
        Set<Long> likedTweetIds = new HashSet<>(likeTweetRepository.findLikedTweetIdsByUserId(userId));
        candidates = excludeLikedTweets(candidates, likedTweetIds);
        if (candidates.isEmpty()) {
            return Page.empty(pageable);
        }

        FeedPersona persona = detectPersona(interactions);
        RankingWeights weights = RankingWeights.forPersona(persona);

        if (interactions.isEmpty()) {
            return fallbackByRecency(candidates, pageable);
        }

        Map<Long, Double> authorAffinity = profile.getBlendedAuthorAffinity();
        double[] userVector = profile.getBlendedUserVector();
        Map<String, Double> userTagScore = profile.getBlendedTagScores();
        Set<Long> followingIds = new HashSet<>(userRepository.getFollowingIdsByUserId(userId));
        Map<Long, ScoredTweet> scored = new HashMap<>();

        for (Tweet tweet : candidates) {
            double[] tweetVector = tagVocabularyService.getOrBuildTweetVector(tweet);
            double semanticSimilarity = cosineSimilarity(userVector, tweetVector);
            Set<String> tweetTags = tagVocabularyService.extractTags(tweet);
            Long authorId = tweet.getUser() == null ? null : tweet.getUser().getId();

            double baseScore = (weights.getSemanticSimilarity() * semanticSimilarity)
                    + (weights.getTrendBoost() * trendingService.trendBoostForTags(tweetTags, trendScores24h))
                    + (weights.getFreshness() * freshnessScore(tweet.getDateTime()))
                    + (weights.getPopularity() * popularityScore(tweet))
                    + (weights.getSocialGraph() * socialGraphScore(authorId, followingIds))
                    + (weights.getTagAffinity() * tagAffinityScore(tweetTags, userTagScore))
                    + (weights.getAuthorAffinity() * authorAffinityScore(authorId, authorAffinity));

            scored.put(tweet.getId(), new ScoredTweet(tweet, baseScore));
        }

        List<ScoredTweet> ranked = scored.values().stream()
                .sorted(Comparator.comparingDouble(ScoredTweet::baseScore).reversed())
                .collect(Collectors.toList());
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tweet để tạo embedding"));
        double[] vector = tagVocabularyService.buildEmbedding(tweet);
        String serialized = tagVocabularyService.serializeVector(vector);
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tweet cho sự kiện"));
        UserInteractionEvent event = new UserInteractionEvent();
        event.setUser(user);
        event.setTweet(tweet);
        event.setInteractionType(interactionType);
        event.setDwellSeconds(dwellSeconds);
        userInteractionEventRepository.save(event);
    }

    private FeedPersona detectPersona(List<UserInteractionEvent> interactions) {
        if (interactions.isEmpty() || interactions.size() < 10) {
            return FeedPersona.NEW_USER;
        }
        if (interactions.size() >= 50) {
            return FeedPersona.ENGAGED;
        }
        return FeedPersona.DEFAULT;
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

    private List<Tweet> excludeLikedTweets(List<Tweet> candidates, Set<Long> likedTweetIds) {
        if (likedTweetIds.isEmpty()) {
            return candidates;
        }
        return candidates.stream()
                .filter(tweet -> tweet.getId() != null && !likedTweetIds.contains(tweet.getId()))
                .collect(Collectors.toList());
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

    private double authorAffinityScore(Long authorId, Map<Long, Double> authorAffinity) {
        if (authorId == null || authorAffinity.isEmpty()) {
            return 0.0;
        }
        double score = authorAffinity.getOrDefault(authorId, 0.0);
        return score / (score + 8.0);
    }

    private double cosineSimilarity(double[] left, double[] right) {
        int length = Math.min(left.length, right.length);
        double dot = 0.0;
        double leftNorm = 0.0;
        double rightNorm = 0.0;
        for (int i = 0; i < length; i++) {
            dot += left[i] * right[i];
            leftNorm += left[i] * left[i];
            rightNorm += right[i] * right[i];
        }
        if (leftNorm == 0.0 || rightNorm == 0.0) {
            return 0.0;
        }
        return dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
    }

    private static class ScoredTweet {
        private final Tweet tweet;
        private final double baseScore;

        private ScoredTweet(Tweet tweet, double baseScore) {
            this.tweet = tweet;
            this.baseScore = baseScore;
        }

        public Tweet tweet() {
            return tweet;
        }

        public double baseScore() {
            return baseScore;
        }
    }
}
