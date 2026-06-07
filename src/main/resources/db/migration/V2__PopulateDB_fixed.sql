-- images
INSERT IGNORE INTO images (id, src) VALUES (11, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg');
INSERT IGNORE INTO images (id, src) VALUES (22, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg');
INSERT IGNORE INTO images (id, src) VALUES (33, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg');
INSERT IGNORE INTO images (id, src) VALUES (44, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg');
INSERT IGNORE INTO images (id, src) VALUES (1, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg');
INSERT IGNORE INTO images (id, src) VALUES (2, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/bd8ae60c-4231-4624-8cdd-dfe61fa38921_779301.jpg');
INSERT IGNORE INTO images (id, src) VALUES (3, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg');
INSERT IGNORE INTO images (id, src) VALUES (4, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/25e1a117-8eac-4156-9cc3-2311319082af_EH0yOTgWwAAXPdT.png');
INSERT IGNORE INTO images (id, src) VALUES (5, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png');
INSERT IGNORE INTO images (id, src) VALUES (6, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/ac48eb0e-73e7-4887-a523-47c5a557d1ad_Ec1OBK3XsAEjVZR.png');
INSERT IGNORE INTO images (id, src) VALUES (7, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif');
INSERT IGNORE INTO images (id, src) VALUES (8, 'https://perfumeweb2.s3.eu-central-1.amazonaws.com/a2692fac-4b70-4828-845c-2fe439473f82_Cl5DjoUWYAAslnd.jfif');
-- users
INSERT IGNORE INTO users (id, about, activation_code, active, background_color, birthday, color_scheme, country, country_code, email, full_name, gender, language, like_count, location, media_tweet_count, muted_direct_messages, notifications_count, password, password_reset_code, phone, private_profile, profile_customized, profile_started, registration_date, role, tweet_count, username, website) VALUES (1, null, null, true, 'DEFAULT', null, 'BLUE', null, null, 'user2015@gmail.com', 'Random', null, null, 1, null, 0, true, 0, '$2a$08$TZekzxmq.KO2f.juYNUa4eU/ePYPx3r2MWONVjPDKOBJB4qUlhkxW', null, null, false, true, true, '2021-11-15 14:05:08.000000', 'USER', 0, 'Random', null);
INSERT IGNORE INTO users (id, about, activation_code, active, background_color, birthday, color_scheme, country, country_code, email, full_name, gender, language, like_count, location, media_tweet_count, muted_direct_messages, notifications_count, password, password_reset_code, phone, private_profile, profile_customized, profile_started, registration_date, role, tweet_count, username, website) VALUES (2, 'Hello twitter!', null, true, 'DIM', null, 'BLUE', 'UA', 'UA', 'user2016@gmail.com', 'MrCat', 'Cat', 'Ukrainian - українська', 30, 'New York', 22, false, 0, '$2a$08$TZekzxmq.KO2f.juYNUa4eU/ePYPx3r2MWONVjPDKOBJB4qUlhkxW', null, 666966623, true, false, true, '2021-08-01 23:34:32.000000', 'USER', 4, 'Cat', 'https://www.google.com');
INSERT IGNORE INTO users (id, about, activation_code, active, background_color, birthday, color_scheme, country, country_code, email, full_name, gender, language, like_count, location, media_tweet_count, muted_direct_messages, notifications_count, password, password_reset_code, phone, private_profile, profile_customized, profile_started, registration_date, role, tweet_count, username, website) VALUES (3, 'Hello twitter!', null, true, 'DEFAULT', null, 'BLUE', null, null, 'user2017@gmail.com', 'Kitty', null, null, 0, 'New York', 0, true, 2, '$2a$08$TZekzxmq.KO2f.juYNUa4eU/ePYPx3r2MWONVjPDKOBJB4qUlhkxW', null, null, false, true, true, '2021-08-01 23:34:32.000000', 'USER', 0, 'Kitty', 'https://www.google.com');
INSERT IGNORE INTO users (id, about, activation_code, active, background_color, birthday, color_scheme, country, country_code, email, full_name, gender, language, like_count, location, media_tweet_count, muted_direct_messages, notifications_count, password, password_reset_code, phone, private_profile, profile_customized, profile_started, registration_date, role, tweet_count, username, website) VALUES (4, 'Hello twitter!', null, true, 'DEFAULT', null, 'BLUE', null, null, 'user2019@gmail.com', 'JavaCat', null, null, 0, 'Java', 0, false, 1, '$2a$08$TZekzxmq.KO2f.juYNUa4eU/ePYPx3r2MWONVjPDKOBJB4qUlhkxW', null, null, false, true, true, '2021-08-01 23:34:32.000000', 'USER', 0, 'JavaCat', 'https://www.java.com');
INSERT IGNORE INTO users (id, about, activation_code, active, background_color, birthday, color_scheme, country, country_code, email, full_name, gender, language, like_count, location, media_tweet_count, muted_direct_messages, notifications_count, password, password_reset_code, phone, private_profile, profile_customized, profile_started, registration_date, role, tweet_count, username, website) VALUES (5, 'Hello twitter!', null, true, 'DEFAULT', null, 'BLUE', null, null, 'user2018@gmail.com', 'КотБегемот', null, null, 0, 'London', 0, false, 2, '$2a$08$TZekzxmq.KO2f.juYNUa4eU/ePYPx3r2MWONVjPDKOBJB4qUlhkxW', null, null, false, true, true, '2021-08-01 23:34:32.000000', null, 0, 'Кот Бегемот', 'https://www.google.com');
-- tweets
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (1, null, null, null, '2021-10-15 21:20:15.000000', null, null, null, null, null, 'EVERYONE', 'My #FirstTweet :slightly_smiling_face:', 1, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (7, null, null, null, '2021-10-15 21:20:27.000000', null, null, null, null, null, 'EVERYONE', 'Hello #FirstTweet  :sunglasses:', 3, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (13, null, null, null, '2021-10-15 21:57:21.000000', null, null, null, null, null, 'EVERYONE', '#JavaScript', 4, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (10, null, null, null, '2021-10-15 21:21:48.000000', null, null, null, null, null, 'EVERYONE', '#myCat  :kissing_cat:', 4, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (12, null, null, null, '2021-10-15 21:23:41.000000', null, null, null, null, null, 'MENTION', '#myCat  :smiley_cat:', 5, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (11, null, null, null, '2021-10-15 21:22:23.000000', null, null, null, null, null, 'EVERYONE', 'My #FirstTweet', 5, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (16, null, 10, 'JavaCat', '2021-10-15 22:21:30.000000', null, null, null, null, null, 'EVERYONE', 'Feels good man  :sunglasses:', 2, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (8, null, null, null, '2021-10-15 21:20:30.000000', null, null, null, null, null, 'FOLLOW', '#myCat  :smiley_cat:', 3, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (9, null, null, null, '2021-10-15 21:20:33.000000', null, null, null, null, null, 'EVERYONE', '#FirstTweet', 4, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (6, null, null, null, '2021-10-15 21:20:26.000000', null, null, null, null, null, 'EVERYONE', '#myCat  :smile_cat:', 2, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (5, null, null, null, '2021-10-15 21:20:24.000000', null, null, null, null, null, 'EVERYONE', 'Another #FirstTweet', 2, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (15, null, null, null, '2021-10-15 22:11:59.000000', null, null, null, null, null, 'EVERYONE', 'Hello :wave:', 1, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (14, null, null, null, '2021-10-15 22:10:14.000000', null, null, null, null, null, 'MENTION', 'Feels Good Man  :sunglasses:', 1, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (4, null, null, null, '2021-10-15 21:20:22.000000', 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO', 'https://i.ytimg.com/vi/hTWKbfoikeg/mqdefault.jpg', null, null, 'Nirvana - Smells Like Teen Spirit (Official Music Video)', 'EVERYONE', 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO', 1, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (3, null, null, null, '2021-10-15 21:20:21.000000', 'https://www.youtube.com/watch?v=-k9qDxyxS3s&ab_channel=BMTHOfficialVEVO', 'https://i.ytimg.com/vi/-k9qDxyxS3s/mqdefault.jpg', null, null, 'Bring Me The Horizon - Shadow Moses (Official Video)', 'EVERYONE', 'https://www.youtube.com/watch?v=-k9qDxyxS3s&ab_channel=BMTHOfficialVEVO', 1, false);
INSERT IGNORE INTO tweets (id, addressed_id, addressed_tweet_id, addressed_username, date_time, link, link_cover, link_cover_size, link_description, link_title, reply_type, text, users_id, deleted) VALUES (2, null, null, null, '2021-10-15 21:20:18.000000', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 'https://i.ytimg.com/vi/ewZZNeYDiLo/mqdefault.jpg', null, null, 'Bones - RestInPeace', 'EVERYONE', 'https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH', 1, false);
-- users_tweets
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (5, 12);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (4, 10);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (4, 9);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (3, 7);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (5, 11);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (3, 8);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 2);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 4);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 1);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 3);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 14);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (1, 15);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (2, 6);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (2, 5);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (2, 13);
INSERT IGNORE INTO users_tweets (user_id, tweets_id) VALUES (2, 16);
-- user_avatar
INSERT IGNORE INTO user_avatar (avatar_id, user_id) VALUES (11, 1);
INSERT IGNORE INTO user_avatar (avatar_id, user_id) VALUES (33, 2);
INSERT IGNORE INTO user_avatar (avatar_id, user_id) VALUES (3, 3);
INSERT IGNORE INTO user_avatar (avatar_id, user_id) VALUES (5, 4);
INSERT IGNORE INTO user_avatar (avatar_id, user_id) VALUES (7, 5);
-- user_wallpaper
INSERT IGNORE INTO user_wallpaper (wallpaper_id, user_id) VALUES (22, 1);
INSERT IGNORE INTO user_wallpaper (wallpaper_id, user_id) VALUES (44, 2);
-- tweet_quote
INSERT IGNORE INTO tweet_quote (quote_tweet_id, tweets_id) VALUES (13, 15);
-- tweets_images
INSERT IGNORE INTO tweets_images (tweet_id, images_id) VALUES (6, 1);
INSERT IGNORE INTO tweets_images (tweet_id, images_id) VALUES (8, 4);
INSERT IGNORE INTO tweets_images (tweet_id, images_id) VALUES (10, 6);
INSERT IGNORE INTO tweets_images (tweet_id, images_id) VALUES (12, 8);
-- like_tweets
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (1, '2021-10-15 21:36:52.000000', 1, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (2, '2021-10-15 21:37:01.000000', 2, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (3, '2021-10-15 21:37:03.000000', 3, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (4, '2021-10-15 21:37:05.000000', 4, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (5, '2021-10-15 21:37:06.000000', 5, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (6, '2021-10-15 21:37:08.000000', 6, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (7, '2021-10-15 21:37:10.000000', 7, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (8, '2021-10-15 21:37:11.000000', 8, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (9, '2021-10-15 21:37:14.000000', 9, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (10, '2021-10-15 21:37:15.000000', 10, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (11, '2021-10-15 21:37:17.000000', 11, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (12, '2021-10-15 21:37:18.000000', 12, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (13, '2021-10-15 21:43:36.000000', 5, 1);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (14, '2021-10-15 21:43:39.000000', 6, 1);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (15, '2021-10-15 22:00:37.000000', 13, 2);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (16, '2021-10-15 22:08:53.000000', 1, 1);
INSERT IGNORE INTO like_tweets (id, like_tweet_date, tweets_id, users_id) VALUES (17, '2021-10-15 22:39:04.000000', 8, 1);
-- retweets
INSERT IGNORE INTO retweets (id, retweet_date, tweets_id, users_id) VALUES (1, '2021-10-15 21:50:56.000000', 10, 1);
INSERT IGNORE INTO retweets (id, retweet_date, tweets_id, users_id) VALUES (2, '2021-10-15 22:00:41.000000', 13, 2);
INSERT IGNORE INTO retweets (id, retweet_date, tweets_id, users_id) VALUES (3, '2021-10-15 22:07:48.000000', 10, 2);
-- replies
INSERT IGNORE INTO replies (tweets_id, reply_id) VALUES (10, 16);
-- quotes
INSERT IGNORE INTO quotes (tweets_id, quote_id) VALUES (13, 15);
-- user_pinned_tweet
INSERT IGNORE INTO user_pinned_tweet (tweet_id, user_id) VALUES (1, 1);
-- tags
INSERT IGNORE INTO tags (id, tag_name, tweets_quantity) VALUES (1, '#FirstTweet', 5);
INSERT IGNORE INTO tags (id, tag_name, tweets_quantity) VALUES (2, '#myCat', 4);
INSERT IGNORE INTO tags (id, tag_name, tweets_quantity) VALUES (3, '#JavaScript', 1);
-- tweets_tags
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (1, 1);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (1, 5);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (1, 7);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (1, 9);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (1, 11);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (2, 6);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (2, 8);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (2, 10);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (2, 12);
INSERT IGNORE INTO tweets_tags (tags_id, tweets_id) VALUES (3, 13);
-- chats
INSERT IGNORE INTO chats (id, creation_date) VALUES (1, '2021-10-16 16:40:07.000000');
-- chats_participants
INSERT IGNORE INTO chats_participants (id, left_chat, chat_id, user_id) VALUES (1, false, 1, 1);
INSERT IGNORE INTO chats_participants (id, left_chat, chat_id, user_id) VALUES (2, false, 1, 2);
-- chat_messages
INSERT IGNORE INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (1, '2021-10-16 16:40:07.000000', 'Hello Cat', 1, 1, null);
INSERT IGNORE INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (2, '2021-10-16 16:40:41.000000', 'How are you?', 1, 1, null);
INSERT IGNORE INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (3, '2021-10-16 16:41:59.000000', 'I''m fine, thanks, and you? ', 2, 1, null);
INSERT IGNORE INTO chat_messages (id, date, text, user_id, chat_id, tweet_id) VALUES (4, '2021-10-16 16:42:50.000000', 'Good)', 1, 1, 14);
-- unread_messages
INSERT IGNORE INTO unread_messages (user_id, chat_message_id) VALUES (2, 4);
-- lists
INSERT IGNORE INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id) VALUES (3, 'https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small', 'Hello from my list', false, 'Hello World!', 2, null);
INSERT IGNORE INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id) VALUES (2, 'https://pbs.twimg.com/media/EXZ2w_qUcAMwN3x?format=png&name=small', 'Some description', false, 'Internal', 1, null);
INSERT IGNORE INTO lists (id, alt_wallpaper, description, private, name, user_id, wallpaper_id) VALUES (1, 'https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small', 'Random List Description', false, 'Random List', 1, null);
-- lists_members
INSERT IGNORE INTO lists_members (lists_id, members_id) VALUES (1, 4);
INSERT IGNORE INTO lists_members (lists_id, members_id) VALUES (1, 2);
-- users_lists
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (1, 1);
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (1, 2);
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (2, 1);
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (2, 3);
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (2, 1);
INSERT IGNORE INTO users_lists (user_id, lists_id) VALUES (2, 2);
-- notifications
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (1, '2021-10-15 21:36:52.000000', 'LIKE', 1, 2, null, null, 1);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (2, '2021-10-15 21:37:01.000000', 'LIKE', 2, 2, null, null, 1);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (3, '2021-10-15 21:37:03.000000', 'LIKE', 3, 2, null, null, 1);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (4, '2021-10-15 21:37:05.000000', 'LIKE', 4, 2, null, null, 1);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (5, '2021-10-15 21:37:10.000000', 'LIKE', 7, 2, null, null, 3);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (6, '2021-10-15 21:37:11.000000', 'LIKE', 8, 2, null, null, 3);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (7, '2021-10-15 21:37:14.000000', 'LIKE', 9, 2, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (8, '2021-10-15 21:37:15.000000', 'LIKE', 10, 2, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (9, '2021-10-15 21:37:17.000000', 'LIKE', 11, 2, null, null, 5);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (10, '2021-10-15 21:37:18.000000', 'LIKE', 12, 2, null, null, 5);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (11, '2021-10-15 21:43:36.000000', 'LIKE', 5, 1, null, null, 2);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (12, '2021-10-15 21:43:39.000000', 'LIKE', 6, 1, null, null, 2);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (13, '2021-10-15 21:43:52.000000', 'FOLLOW', null, 1, 2, null, 2);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (14, '2021-10-15 21:50:56.000000', 'RETWEET', 10, 1, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (15, '2021-10-15 22:00:37.000000', 'LIKE', 13, 2, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (16, '2021-10-15 22:00:41.000000', 'RETWEET', 13, 2, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (17, '2021-10-15 22:01:19.000000', 'FOLLOW', null, 2, 1, null, 1);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (18, '2021-10-15 22:07:48.000000', 'RETWEET', 10, 2, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (19, '2021-10-15 22:10:37.000000', 'RETWEET', 13, 1, null, null, 4);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (20, '2021-10-15 22:37:51.000000', 'RETWEET', 8, 1, null, null, 3);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (21, '2021-10-15 22:39:04.000000', 'LIKE', 8, 1, null, null, 3);
INSERT IGNORE INTO notifications (id, date, notification_type, tweet_id, user_id, user_to_follow_id, list_id, notified_user_id) VALUES (22, '2021-10-15 22:45:53.000000', 'FOLLOW', null, 1, 5, null, 5);
-- user_subscriptions
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 2);
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 3);
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 4);
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (1, 5);
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (2, 1);
INSERT IGNORE INTO user_subscriptions (subscriber_id, user_id) VALUES (5, 1);
-- users_notifications
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (2, 13);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (2, 12);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (2, 11);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (5, 10);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (5, 9);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (5, 22);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 18);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 16);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 15);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 14);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 8);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 7);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (4, 19);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (3, 5);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (3, 6);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (3, 20);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (3, 21);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (1, 17);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (1, 4);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (1, 3);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (1, 2);
INSERT IGNORE INTO users_notifications (user_id, notifications_id) VALUES (1, 1);
