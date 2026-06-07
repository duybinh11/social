package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.TweetEmbedding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TweetEmbeddingRepository extends JpaRepository<TweetEmbedding, Long> {
    Optional<TweetEmbedding> findByTweet_Id(Long tweetId);
}
