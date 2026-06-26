package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.LikeTweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.LikeTweetProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeTweetRepository extends JpaRepository<LikeTweet, Long> {

    @Query("SELECT likeTweet.tweet.id FROM LikeTweet likeTweet " +
            "WHERE likeTweet.user.id = :userId " +
            "AND likeTweet.tweet.deleted = false")
    List<Long> findLikedTweetIdsByUserId(Long userId);

    @Query("SELECT likeTweet FROM LikeTweet likeTweet " +
            "LEFT JOIN likeTweet.user user " +
            "LEFT JOIN likeTweet.tweet tweet " +
            "WHERE likeTweet.user.id = :userId " +
            "AND tweet.deleted = false " +
            "ORDER BY likeTweet.likeTweetDate DESC")
    Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable);
}
