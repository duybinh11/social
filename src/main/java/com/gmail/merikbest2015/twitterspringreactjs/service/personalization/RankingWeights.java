package com.gmail.merikbest2015.twitterspringreactjs.service.personalization;

import lombok.Value;

@Value
public class RankingWeights {
    double semanticSimilarity;
    double trendBoost;
    double freshness;
    double popularity;
    double socialGraph;
    double tagAffinity;
    double authorAffinity;

    public static RankingWeights defaults() {
        return new RankingWeights(0.30, 0.12, 0.13, 0.13, 0.09, 0.09, 0.14);
    }

    public static RankingWeights forPersona(FeedPersona persona) {
        switch (persona) {
            case NEW_USER:
                return new RankingWeights(0.26, 0.12, 0.13, 0.21, 0.17, 0.05, 0.06);
            case ENGAGED:
                return new RankingWeights(0.38, 0.10, 0.10, 0.10, 0.07, 0.17, 0.08);
            case DEFAULT:
            default:
                return defaults();
        }
    }
}
