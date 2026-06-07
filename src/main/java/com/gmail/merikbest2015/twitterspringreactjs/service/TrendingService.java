package com.gmail.merikbest2015.twitterspringreactjs.service;

import java.util.Map;
import java.util.Set;

public interface TrendingService {

    /**
     * Normalized trend scores (0..1) per tag for the last 24 hours.
     */
    Map<String, Double> getNormalizedTrendScores24h();

    /**
     * Max trend score among tweet tags.
     */
    double trendBoostForTags(Set<String> tags, Map<String, Double> trendScores);
}
