package com.gmail.merikbest2015.twitterspringreactjs.service.personalization;

import java.util.Map;

public class UserInterestProfile {

    private final Map<String, Double> recentTagScores;
    private final Map<String, Double> longTermTagScores;
    private final Map<String, Double> blendedTagScores;
    private final Map<Long, Double> blendedAuthorAffinity;
    private final double[] blendedUserVector;

    public UserInterestProfile(Map<String, Double> recentTagScores,
                               Map<String, Double> longTermTagScores,
                               Map<String, Double> blendedTagScores,
                               Map<Long, Double> blendedAuthorAffinity,
                               double[] blendedUserVector) {
        this.recentTagScores = recentTagScores;
        this.longTermTagScores = longTermTagScores;
        this.blendedTagScores = blendedTagScores;
        this.blendedAuthorAffinity = blendedAuthorAffinity;
        this.blendedUserVector = blendedUserVector;
    }

    public Map<String, Double> getRecentTagScores() {
        return recentTagScores;
    }

    public Map<String, Double> getLongTermTagScores() {
        return longTermTagScores;
    }

    public Map<String, Double> getBlendedTagScores() {
        return blendedTagScores;
    }

    public Map<Long, Double> getBlendedAuthorAffinity() {
        return blendedAuthorAffinity;
    }

    public double[] getBlendedUserVector() {
        return blendedUserVector;
    }
}
