package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.UserInteractionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserInteractionEventRepository extends JpaRepository<UserInteractionEvent, Long> {

    @Query("SELECT event FROM UserInteractionEvent event " +
            "LEFT JOIN FETCH event.tweet tweet " +
            "WHERE event.user.id = :userId " +
            "AND tweet.deleted = false " +
            "ORDER BY event.eventTime DESC")
    List<UserInteractionEvent> findRecentByUserId(Long userId);

    @Query("SELECT event FROM UserInteractionEvent event " +
            "LEFT JOIN FETCH event.tweet tweet " +
            "WHERE event.eventTime >= :from " +
            "AND event.eventTime < :to " +
            "AND tweet.deleted = false")
    List<UserInteractionEvent> findByEventTimeBetween(LocalDateTime from, LocalDateTime to);
}
