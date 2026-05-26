import React from "react";
import {Link as MuiLink} from "@material-ui/core";

import Security from "../Security";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../../util/testHelper";
import {SETTINGS_SECURITY_LOGIN_VERIFICATION} from "../../../../../util/pathConstants";
import {ACCOUNT_SECURITY_TIPS, TWO_FACTOR_AUTHENTICATION} from "../../../../../util/url";

describe("Bảo mật", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Security/>, createMockRootState());
        expect(wrapper.text().includes("Manage your account’s security.")).toBe(true);
        expect(wrapper.text().includes("Xác thực hai yếu tố")).toBe(true);
        expect(wrapper.text().includes("Bảo vệ mật khẩu bổ sung")).toBe(true);
        expect(wrapper.text().includes("Password reset protect")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(TWO_FACTOR_AUTHENTICATION);
        expect(wrapper.find(MuiLink).at(1).prop("href")).toBe(ACCOUNT_SECURITY_TIPS);
    });

    it("should link to Two-factor authentication", () => {
        testClickOnLink(<Security/>, SETTINGS_SECURITY_LOGIN_VERIFICATION, 0);
    });
});
