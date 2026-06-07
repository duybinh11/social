
-- MySQL / Hibernate table-based sequences
UPDATE users_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM users);
UPDATE tweets_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM tweets);
UPDATE tags_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM tags);
UPDATE like_tweets_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM like_tweets);
UPDATE retweets_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM retweets);
UPDATE images_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM images);
UPDATE lists_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM lists);
UPDATE notifications_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM notifications);
UPDATE chat_messages_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM chat_messages);
UPDATE chats_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM chats);
UPDATE chats_participants_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM chats_participants);
UPDATE pools_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM pools);
UPDATE pool_choices_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM pool_choices);

-- Nếu đã import V9 interaction data:
UPDATE user_interaction_events_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM user_interaction_events);
UPDATE tweet_embeddings_seq SET next_val = (SELECT COALESCE(MAX(id), 0) + 1 FROM tweet_embeddings);