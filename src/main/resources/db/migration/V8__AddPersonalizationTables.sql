-- Bảng phục vụ feed cá nhân hóa (chạy trước V11 nếu chưa có).
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS user_interaction_events
(
    id               bigint       NOT NULL,
    user_id          bigint       NOT NULL,
    tweet_id         bigint       NOT NULL,
    interaction_type varchar(64)  NOT NULL,
    event_time       datetime     NOT NULL,
    dwell_seconds    int,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tweet_embeddings
(
    id          bigint   NOT NULL,
    tweet_id    bigint   NOT NULL,
    vector_data text     NOT NULL,
    updated_at  datetime NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tweet_embedding_tweet (tweet_id)
);

CREATE INDEX idx_user_interaction_user_time ON user_interaction_events (user_id, event_time DESC);
CREATE INDEX idx_user_interaction_tweet ON user_interaction_events (tweet_id);

ALTER TABLE user_interaction_events
    ADD CONSTRAINT fk_user_interaction_user FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE user_interaction_events
    ADD CONSTRAINT fk_user_interaction_tweet FOREIGN KEY (tweet_id) REFERENCES tweets (id);
ALTER TABLE tweet_embeddings
    ADD CONSTRAINT fk_tweet_embedding_tweet FOREIGN KEY (tweet_id) REFERENCES tweets (id);

CREATE TABLE IF NOT EXISTS user_interaction_events_seq (next_val bigint);
INSERT IGNORE INTO user_interaction_events_seq VALUES (100);

CREATE TABLE IF NOT EXISTS tweet_embeddings_seq (next_val bigint);
INSERT IGNORE INTO tweet_embeddings_seq VALUES (100);
