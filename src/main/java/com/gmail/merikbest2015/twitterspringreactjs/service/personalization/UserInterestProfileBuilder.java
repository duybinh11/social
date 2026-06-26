package com.gmail.merikbest2015.twitterspringreactjs.service.personalization;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import com.gmail.merikbest2015.twitterspringreactjs.model.UserInteractionEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserInterestProfileBuilder {

    private static final int RECENT_INTERACTION_COUNT = 20;
    private static final double RECENT_BLEND = 0.65;
    private static final double LONG_TERM_BLEND = 0.35;
    private static final double RECENT_DECAY_TAU_HOURS = 24.0;

    private final TagVocabularyService tagVocabularyService;

    public UserInterestProfile build(List<UserInteractionEvent> interactions) {
        List<UserInteractionEvent> recentInteractions = interactions.stream()
                .limit(RECENT_INTERACTION_COUNT)
                .collect(Collectors.toList());

        Map<String, Double> recentTagScores = buildTagScores(recentInteractions, true);
        Map<String, Double> longTermTagScores = buildTagScores(interactions, false);
        Map<String, Double> blendedTagScores = blendStringMaps(recentTagScores, longTermTagScores);
        Map<Long, Double> blendedAuthorAffinity = blendLongMaps(
                buildAuthorAffinity(recentInteractions, true),
                buildAuthorAffinity(interactions, false));
        double[] blendedUserVector = blendVectors(
                buildUserVector(recentInteractions, true),
                buildUserVector(interactions, false));

        return new UserInterestProfile(
                recentTagScores,
                longTermTagScores,
                blendedTagScores,
                blendedAuthorAffinity,
                blendedUserVector
        );
    }

    private Map<String, Double> buildTagScores(List<UserInteractionEvent> interactions, boolean recentWindow) {
        Map<String, Double> scores = new HashMap<>();
        for (int index = 0; index < interactions.size(); index++) {
            UserInteractionEvent event = interactions.get(index);
            if (event.getTweet() == null) {
                continue;
            }
            double weight = interactionWeight(event, recentWindow, index);
            Set<String> tags = tagVocabularyService.extractTags(event.getTweet());
            for (String tag : tags) {
                scores.merge(tag, weight, Double::sum);
            }
        }
        return scores;
    }

    private Map<Long, Double> buildAuthorAffinity(List<UserInteractionEvent> interactions, boolean recentWindow) {
        Map<Long, Double> scores = new HashMap<>();
        for (int index = 0; index < interactions.size(); index++) {
            UserInteractionEvent event = interactions.get(index);
            if (event.getTweet() == null || event.getTweet().getUser() == null) {
                continue;
            }
            Long authorId = event.getTweet().getUser().getId();
            scores.merge(authorId, interactionWeight(event, recentWindow, index), Double::sum);
        }
        return scores;
    }

    private double[] buildUserVector(List<UserInteractionEvent> interactions, boolean recentWindow) {
        int dimension = tagVocabularyService.getVocabulary().size();
        double[] vector = new double[dimension];
        double totalWeight = 0.0;
        for (int index = 0; index < interactions.size(); index++) {
            UserInteractionEvent event = interactions.get(index);
            if (event.getTweet() == null) {
                continue;
            }
            double weight = interactionWeight(event, recentWindow, index);
            double[] eventVector = tagVocabularyService.getOrBuildTweetVector(event.getTweet());
            int length = Math.min(vector.length, eventVector.length);
            for (int i = 0; i < length; i++) {
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

    private double interactionWeight(UserInteractionEvent event, boolean recentWindow, int index) {
        double weight;
        switch (event.getInteractionType()) {
            case CLICK:
                weight = 1.0;
                break;
            case READ:
                weight = 2.0;
                break;
            case LIKE:
                weight = 3.0;
                break;
            case COMMENT:
                weight = 3.5;
                break;
            case SAVE:
                weight = 4.0;
                break;
            case RETWEET:
                weight = 2.5;
                break;
            default:
                weight = 1.0;
        }
        weight *= recencyMultiplier(event.getEventTime());
        if (recentWindow) {
            weight *= 1.0 / (1.0 + index * 0.2);
        }

        return weight;
    }

    private double recencyMultiplier(LocalDateTime eventTime) {
        long hours = Math.max(0, Duration.between(eventTime, LocalDateTime.now()).toHours());
        return Math.exp(-hours / RECENT_DECAY_TAU_HOURS);
    }

    private Map<String, Double> blendStringMaps(Map<String, Double> recent, Map<String, Double> longTerm) {
        Map<String, Double> blended = new HashMap<>();
        Set<String> keys = new HashSet<>();
        keys.addAll(recent.keySet());
        keys.addAll(longTerm.keySet());
        for (String key : keys) {
            double recentValue = recent.getOrDefault(key, 0.0);
            double longTermValue = longTerm.getOrDefault(key, 0.0);
            blended.put(key, (RECENT_BLEND * recentValue) + (LONG_TERM_BLEND * longTermValue));
        }
        return blended;
    }

    private Map<Long, Double> blendLongMaps(Map<Long, Double> recent, Map<Long, Double> longTerm) {
        Map<Long, Double> blended = new HashMap<>();
        Set<Long> keys = new HashSet<>();
        keys.addAll(recent.keySet());
        keys.addAll(longTerm.keySet());
        for (Long key : keys) {
            double recentValue = recent.getOrDefault(key, 0.0);
            double longTermValue = longTerm.getOrDefault(key, 0.0);
            blended.put(key, (RECENT_BLEND * recentValue) + (LONG_TERM_BLEND * longTermValue));
        }
        return blended;
    }

    private double[] blendVectors(double[] recent, double[] longTerm) {
        int length = Math.max(recent.length, longTerm.length);
        double[] blended = new double[length];
        for (int i = 0; i < length; i++) {
            double recentValue = i < recent.length ? recent[i] : 0.0;
            double longTermValue = i < longTerm.length ? longTerm[i] : 0.0;
            blended[i] = (RECENT_BLEND * recentValue) + (LONG_TERM_BLEND * longTermValue);
        }
        return normalize(blended);
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
}
