import React from "react";

import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../util/testHelper";
import AccessibilityDisplayLanguages from "../AccessibilityDisplayLanguages";
import {
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES
} from "../../../../util/pathConstants";

describe("AccessibilityDisplayLanguages", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccessibilityDisplayLanguages/>, createMockRootState());

        expect(wrapper.text().includes("Manage how Twitter content is displayed to you.")).toBe(true);
        expect(wrapper.text().includes("Trợ năng")).toBe(true);
        expect(wrapper.text().includes("Hiển thị")).toBe(true);
        expect(wrapper.text().includes("Ngôn ngữ")).toBe(true);
        expect(wrapper.text().includes("Sử dụng dữ liệu")).toBe(true);
    });

    it("should link to Accessibility", () => {
        testClickOnLink(<AccessibilityDisplayLanguages/>, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY, 0);
    });

    it("should link to Display", () => {
        testClickOnLink(<AccessibilityDisplayLanguages/>, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY, 1);
    });

    it("should link to Languages", () => {
        testClickOnLink(<AccessibilityDisplayLanguages/>, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES, 2);
    });

    it("should link to Data usage", () => {
        testClickOnLink(<AccessibilityDisplayLanguages/>, SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA, 3);
    });
});
