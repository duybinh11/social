package com.gmail.merikbest2015.twitterspringreactjs.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Keeps Hibernate table-based sequences aligned with manually imported seed data.
 * Required when Flyway is disabled and SQL migrations set explicit primary keys.
 */
@Component
@Slf4j
public class DatabaseSequenceSynchronizer {

    private static final Map<String, String> SEQUENCE_TO_TABLE = new LinkedHashMap<>();

    static {
        SEQUENCE_TO_TABLE.put("users_seq", "users");
        SEQUENCE_TO_TABLE.put("tweets_seq", "tweets");
        SEQUENCE_TO_TABLE.put("tags_seq", "tags");
        SEQUENCE_TO_TABLE.put("like_tweets_seq", "like_tweets");
        SEQUENCE_TO_TABLE.put("retweets_seq", "retweets");
        SEQUENCE_TO_TABLE.put("images_seq", "images");
        SEQUENCE_TO_TABLE.put("lists_seq", "lists");
        SEQUENCE_TO_TABLE.put("notifications_seq", "notifications");
        SEQUENCE_TO_TABLE.put("chat_messages_seq", "chat_messages");
        SEQUENCE_TO_TABLE.put("chats_seq", "chats");
        SEQUENCE_TO_TABLE.put("chats_participants_seq", "chats_participants");
        SEQUENCE_TO_TABLE.put("pools_seq", "pools");
        SEQUENCE_TO_TABLE.put("pool_choices_seq", "pool_choices");
        SEQUENCE_TO_TABLE.put("user_interaction_events_seq", "user_interaction_events");
        SEQUENCE_TO_TABLE.put("tweet_embeddings_seq", "tweet_embeddings");
    }

    @PersistenceContext
    private EntityManager entityManager;

    @EventListener(ApplicationReadyEvent.class)
    public void syncSequences() {
        SEQUENCE_TO_TABLE.forEach(this::syncSequence);
    }

    private void syncSequence(String sequenceName, String tableName) {
        try {
            entityManager.createNativeQuery(
                    "UPDATE " + sequenceName + " SET next_val = "
                            + "(SELECT COALESCE(MAX(id), 0) + 1 FROM " + tableName + ")"
            ).executeUpdate();
            log.debug("Synced {} from {}", sequenceName, tableName);
        } catch (Exception e) {
            log.trace("Skipped sequence sync for {}: {}", sequenceName, e.getMessage());
        }
    }
}
