package com.gmail.merikbest2015.twitterspringreactjs.service.cron;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CronService {

    private final SimpMessagingTemplate messagingTemplate;
    private final TweetRepository tweetRepository;
    private final TweetMapper tweetMapper;

    @Scheduled(initialDelay = 30000, fixedDelay = 30000)
    @Transactional
    public void sendTweetBySchedule() {
        LocalDateTime now = LocalDateTime.now();
        List<Long> dueTweetIds = tweetRepository.findDueScheduledTweetIds(now);

        if (dueTweetIds.isEmpty()) {
            return;
        }

        tweetRepository.publishDueScheduledTweets(now);

        List<TweetResponse> publishedTweets = dueTweetIds.stream()
                .map(tweetMapper::getTweetById)
                .collect(Collectors.toList());

        messagingTemplate.convertAndSend("/topic/feed/schedule", publishedTweets);
    }
}
