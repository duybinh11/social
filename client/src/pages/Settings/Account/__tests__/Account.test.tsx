import React from "react";

import Account from "../Account";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../util/testHelper";
import {SETTINGS_DEACTIVATE, SETTINGS_INFO, SETTINGS_PASSWORD, SETTINGS_TEAMS} from "../../../../util/pathConstants";

describe("Tài khoản", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Account/>, createMockRootState());

        expect(wrapper.text().includes("Thông tin tài khoản")).toBe(true);
        expect(wrapper.text().includes("Đổi mật khẩu")).toBe(true);
        expect(wrapper.text().includes("Tải bản lưu dữ liệu của bạn")).toBe(true);
        expect(wrapper.text().includes("Nhóm TweetDeck")).toBe(true);
        expect(wrapper.text().includes("Vô hiệu hóa tài khoản")).toBe(true);
    });
    
    it("should link to Account information", () => {
        testClickOnLink(<Account/>, SETTINGS_INFO, 0);
    });

    it("should link to Change your password", () => {
        testClickOnLink(<Account/>, SETTINGS_PASSWORD, 1);
    });

    it("should link to TweetDeck Teams", () => {
        testClickOnLink(<Account/>, SETTINGS_TEAMS, 2);
    });

    it("should link to Deactivate your account", () => {
        testClickOnLink(<Account/>, SETTINGS_DEACTIVATE, 3);
    });
});
