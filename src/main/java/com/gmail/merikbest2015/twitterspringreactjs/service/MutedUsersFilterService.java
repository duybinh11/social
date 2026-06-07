package com.gmail.merikbest2015.twitterspringreactjs.service;

import java.util.List;

public interface MutedUsersFilterService {

    List<Long> getMutedUserIdsForAuthUser();

    List<Long> excludeMutedUserIds(List<Long> userIds);
}
