package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.enums.InteractionType;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PersonalizationService {
    Page<TweetProjection> getPersonalizedTweets(Pageable pageable);

    void indexTweetEmbedding(Long tweetId);

    void trackInteraction(Long tweetId, InteractionType interactionType, Integer dwellSeconds);
}
