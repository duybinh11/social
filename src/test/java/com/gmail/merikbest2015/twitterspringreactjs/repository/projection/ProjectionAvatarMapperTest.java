package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ProjectionAvatarMapperTest {

    @Test
    @DisplayName("Should map avatar with id and src")
    void toAvatar_withValues() {
        Map<String, Object> avatar = ProjectionAvatarMapper.toAvatar(1L, "https://example.com/a.jpg");

        assertEquals(1L, avatar.get("id"));
        assertEquals("https://example.com/a.jpg", avatar.get("src"));
    }

    @Test
    @DisplayName("Should allow null id and src without throwing")
    void toAvatar_withNullValues() {
        Map<String, Object> avatar = ProjectionAvatarMapper.toAvatar(null, null);

        assertNull(avatar.get("id"));
        assertNull(avatar.get("src"));
    }
}
