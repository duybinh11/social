import React from "react";

import Account from "../Account";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../util/testHelper";
import {SETTINGS_INFO, SETTINGS_PASSWORD} from "../../../../util/pathConstants";

describe("Tài khoản", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Account/>, createMockRootState());

        expect(wrapper.text().includes("Thông tin tài khoản")).toBe(true);
        expect(wrapper.text().includes("Đổi mật khẩu")).toBe(true);
        expect(wrapper.text().includes("Tải bản lưu dữ liệu của bạn")).toBe(false);
        expect(wrapper.text().includes("Nhóm TweetDeck")).toBe(false);
        expect(wrapper.text().includes("Vô hiệu hóa tài khoản")).toBe(false);
    });

    it("should link to Account information", () => {
        testClickOnLink(<Account/>, SETTINGS_INFO, 0);
    });

    it("should link to Change your password", () => {
        testClickOnLink(<Account/>, SETTINGS_PASSWORD, 1);
    });
});
