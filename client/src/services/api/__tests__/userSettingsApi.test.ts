import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {testApiCall} from "../../../util/apiTestHelper";
import {
    API_SETTINGS_UPDATE_BACKGROUND_COLOR,
    API_SETTINGS_UPDATE_COLOR_SCHEME,
    API_SETTINGS_UPDATE_COUNTRY,
    API_SETTINGS_UPDATE_EMAIL,
    API_SETTINGS_UPDATE_PHONE,
    API_SETTINGS_UPDATE_USERNAME
} from "../../../util/endpoints";
import {UserSettingsApi} from "../userSettingsApi";
import {BackgroundTheme, ColorScheme} from "../../../store/types/common";
import {mockUser} from "../../../util/mockData/mockData";

describe("UserSettingsApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockRequest = {
        username: "test",
        email: "test@test.test",
        countryCode: "111",
        phone: 1234567,
        country: "test",
        colorScheme: ColorScheme.GREEN,
        backgroundColor: BackgroundTheme.LIGHTS_OUT
    };

    beforeEach(() => mockAdapter.reset());

    describe("should call UserSettingsApi.updateUsername", () => {
        it("[200] should update username Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_USERNAME, 200, "test", UserSettingsApi.updateUsername, mockRequest);
        });

        it("[400] should return Incorrect username length error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_USERNAME, 400, "Độ dài tên người dùng không hợp lệ", UserSettingsApi.updateUsername, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateEmail", () => {
        const mockAuthUserResponse = {user: mockUser, token: "test_token"};

        it("[200] should update email Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_EMAIL, 200, mockAuthUserResponse, UserSettingsApi.updateEmail, mockRequest);
        });

        it("[403] should return Email has already been taken error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_EMAIL, 403, "Email đã được sử dụng.", UserSettingsApi.updateEmail, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updatePhone", () => {
        const mockChangePhoneResponse = {countryCode: "test", phone: 123456789};

        it("[200] should update phone Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_PHONE, 200, mockChangePhoneResponse, UserSettingsApi.updatePhone, mockRequest);
        });

        it("[400] should return Not valid phone number error", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_PHONE, 400, "Số điện thoại không hợp lệ", UserSettingsApi.updatePhone, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateCountry", () => {
        it("[200] should update country Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_COUNTRY, 200, "test", UserSettingsApi.updateCountry, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateColorScheme", () => {
        it("[200] should update color scheme Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_COLOR_SCHEME, 200, ColorScheme.GREEN, UserSettingsApi.updateColorScheme, mockRequest);
        });
    });

    describe("should call UserSettingsApi.updateBackgroundColor", () => {
        it("[200] should update background color Success", () => {
            testApiCall(mockAdapter, "onPut", API_SETTINGS_UPDATE_BACKGROUND_COLOR, 200, BackgroundTheme.LIGHTS_OUT, UserSettingsApi.updateBackgroundColor, mockRequest);
        });
    });
});
