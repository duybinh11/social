import React from "react";
import {Button} from "@material-ui/core";

import ContentPreferences from "../ContentPreferences";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../../util/testHelper";
import {
    SETTINGS_PERSONALIZATION,
    SETTINGS_PRIVACY_AND_SAFETY_BLOCKED,
    SETTINGS_PRIVACY_AND_SAFETY_MUTED
} from "../../../../../util/pathConstants";
import ExploreModal from "../ExploreModal/ExploreModal";
import RecommendationsModal from "../RecommendationsModal/RecommendationsModal";
import {LoadingStatus} from "../../../../../store/types/common";

describe("ContentPreferences", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentPreferences/>, mockStore);
        
        expect(wrapper.text().includes("Khám phá")).toBe(true);
        expect(wrapper.text().includes("Search settings")).toBe(true);
        expect(wrapper.text().includes("Explore settings")).toBe(true);
        expect(wrapper.text().includes("Ngôn ngữ")).toBe(true);
        expect(wrapper.text().includes("Recommendations")).toBe(true);
        expect(wrapper.text().includes("Safety")).toBe(true);
        expect(wrapper.text().includes("Đã tắt tiếng")).toBe(true);
        expect(wrapper.text().includes("Tài khoản đã chặn")).toBe(true);
        expect(wrapper.text().includes("Cá nhân hóa và dữ liệu")).toBe(true);
        expect(wrapper.text().includes("Cho phép một số")).toBe(true);
    });

    it("should open Search settings modal", () => {
        const wrapper = mountWithStore(<ContentPreferences/>, mockStore);

        expect(wrapper.find(ExploreModal).prop("visible")).toBe(false);
        wrapper.find("#searchSettings").simulate("click");
        
        expect(wrapper.find(ExploreModal).prop("visible")).toBe(true);
        expect(wrapper.find(ExploreModal).prop("isSearchModal")).toBe(true);
    });

    it("should open Explore settings modal", () => {
        const wrapper = mountWithStore(<ContentPreferences/>, mockStore);

        expect(wrapper.find(ExploreModal).prop("visible")).toBe(false);
        wrapper.find("#exploreSettings").simulate("click");

        expect(wrapper.find(ExploreModal).prop("visible")).toBe(true);
        expect(wrapper.find(ExploreModal).prop("isSearchModal")).toBe(false);
    });

    it("should open Visible Recommendations Modal and close", () => {
        const wrapper = mountWithStore(<ContentPreferences/>, mockStore);

        expect(wrapper.find(RecommendationsModal).prop("visible")).toBe(false);
        wrapper.find("#openVisibleRecommendationsModal").simulate("click");

        expect(wrapper.find(RecommendationsModal).prop("visible")).toBe(true);

        wrapper.find(RecommendationsModal).find(Button).simulate("click");
        expect(wrapper.find(RecommendationsModal).prop("visible")).toBe(false);
    });

    it("should link to Muted page", () => {
        testClickOnLink(<ContentPreferences/>, SETTINGS_PRIVACY_AND_SAFETY_MUTED, 0);
    });

    it("should link to Blocked page", () => {
        testClickOnLink(<ContentPreferences/>, SETTINGS_PRIVACY_AND_SAFETY_BLOCKED, 1);
    });

    it("should link to Personalization", () => {
        testClickOnLink(<ContentPreferences/>, SETTINGS_PERSONALIZATION, 2);
    });
});
