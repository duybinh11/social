package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.MutedUsersFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MutedUsersFilterServiceImpl implements MutedUsersFilterService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @Override
    public List<Long> getMutedUserIdsForAuthUser() {
        try {
            Long authUserId = authenticationService.getAuthenticatedUserId();
            List<Long> mutedUserIds = userRepository.getMutedUserIdsByUserId(authUserId);
            return mutedUserIds == null ? Collections.emptyList() : mutedUserIds;
        } catch (Exception exception) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Long> excludeMutedUserIds(List<Long> userIds) {
        List<Long> mutedUserIds = getMutedUserIdsForAuthUser();
        if (mutedUserIds.isEmpty() || userIds == null || userIds.isEmpty()) {
            return userIds;
        }
        Set<Long> mutedSet = new HashSet<>(mutedUserIds);
        return userIds.stream()
                .filter(userId -> !mutedSet.contains(userId))
                .collect(Collectors.toList());
    }
}
