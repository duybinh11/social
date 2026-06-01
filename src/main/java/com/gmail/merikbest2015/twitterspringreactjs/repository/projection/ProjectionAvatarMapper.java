package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import java.util.HashMap;
import java.util.Map;

public final class ProjectionAvatarMapper {

    private ProjectionAvatarMapper() {
    }

    public static Map<String, Object> toAvatar(Long id, String src) {
        Map<String, Object> avatar = new HashMap<>(2);
        avatar.put("id", id);
        avatar.put("src", src);
        return avatar;
    }
}
