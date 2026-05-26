import React from "react";

import PrivacyAndSafety from "../PrivacyAndSafety";
import {
    SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE,
    SETTINGS_PRIVACY_AND_SAFETY_CONTACTS,
    SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE,
    SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS,
    SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES,
    SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION,
    SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK,
    SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY,
    SETTINGS_PRIVACY_AND_SAFETY_SPACES,
    SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS
} from "../../../../util/pathConstants";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../util/testHelper";

describe("PrivacyAndSafety", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PrivacyAndSafety/>, createMockRootState());

        expect(wrapper.text().includes("Manage what information you see and share on Twitter.")).toBe(true);
        expect(wrapper.text().includes("Your Twitter activity")).toBe(true);
        expect(wrapper.text().includes("Đối tượng và gắn thẻ")).toBe(true);
        expect(wrapper.text().includes("Tweet của bạn")).toBe(true);
        expect(wrapper.text().includes("Nội dung bạn thấy")).toBe(true);
        expect(wrapper.text().includes("Tắt tiếng và chặn")).toBe(true);
        expect(wrapper.text().includes("Tin nhắn trực tiếp")).toBe(true);
        expect(wrapper.text().includes("Spaces")).toBe(true);
        expect(wrapper.text().includes("Khả năng tìm thấy và danh bạ")).toBe(true);
        expect(wrapper.text().includes("Tùy chọn quảng cáo")).toBe(true);
        expect(wrapper.text().includes("Hoạt động ngoài Twitter")).toBe(true);
        expect(wrapper.text().includes("Chia sẻ dữ liệu với đối tác kinh doanh")).toBe(true);
        expect(wrapper.text().includes("Thông tin vị trí")).toBe(true);
        expect(wrapper.text().includes("Privacy center")).toBe(true);
        expect(wrapper.text().includes("Privacy policy")).toBe(true);
        expect(wrapper.text().includes("Contact us")).toBe(true);
    });

    it("should navigate to Audience and tagging", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE, 0);
    });

    it("should navigate to Your Tweets", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_YOUR_TWEETS, 1);
    });

    it("should navigate to Content you see", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_CONTENT_YOU_SEE, 2);
    });

    it("should navigate to Mute and block", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_MUTE_AND_BLOCK, 3);
    });

    it("should navigate to Direct Messages", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_DIRECT_MESSAGES, 4);
    });

    it("should navigate to Spaces", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_SPACES, 5);
    });

    it("should navigate to Discoverability and contacts", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_CONTACTS, 6);
    });

    it("should navigate to Ads preferences", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_ADS_PREFERENCES, 7);
    });

    it("should navigate to Off-Twitter activity", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_OFF_TWITTER_ACTIVITY, 8);
    });

    it("should navigate to Data sharing with business partners", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_DATA_SHARING_WITH_BUSINESS_PARTNERS, 9);
    });

    it("should navigate to Location information", () => {
        testClickOnLink(<PrivacyAndSafety/>, SETTINGS_PRIVACY_AND_SAFETY_LOCATION_INFORMATION, 10);
    });
});
