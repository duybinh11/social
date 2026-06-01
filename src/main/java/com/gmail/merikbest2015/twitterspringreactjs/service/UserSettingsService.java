package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.enums.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.enums.ColorSchemeType;

import java.util.Map;

public interface UserSettingsService {

    String updateUsername(String username);

    Map<String, Object> updateEmail(String email);

    Map<String, Object> updatePhone(String countryCode, Long phone);

    String updateCountry(String country);

    ColorSchemeType updateColorScheme(ColorSchemeType colorSchemeType);

    BackgroundColorType updateBackgroundColor(BackgroundColorType backgroundColorType);
}
