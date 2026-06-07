package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.repository.TagRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetsProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tag.TagProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.MutedUsersFilterService;
import com.gmail.merikbest2015.twitterspringreactjs.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TweetRepository tweetRepository;
    private final MutedUsersFilterService mutedUsersFilterService;

    @Override
    public List<TagProjection> getTags() {
        return tagRepository.findTop5ByOrderByTweetsQuantityDesc();
    }

    @Override
    public Page<TagProjection> getTrends(Pageable pageable) {
        return tagRepository.findByOrderByTweetsQuantityDesc(pageable);
    }

    @Override
    public List<TweetProjection> getTweetsByTag(String tagName) {
        Set<Long> mutedUserIds = Set.copyOf(mutedUsersFilterService.getMutedUserIdsForAuthUser());
        return tweetRepository.getTweetsByTagName(tagName).stream()
                .map(TweetsProjection::getTweet)
                .filter(tweet -> tweet.getUser() == null || !mutedUserIds.contains(tweet.getUser().getId()))
                .collect(Collectors.toList());
    }
}
