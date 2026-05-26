import React from "react";

import SecurityAndAccountAccess from "../SecurityAndAccountAccess";
import {createMockRootState, mountWithStore, testClickOnLink} from "../../../../util/testHelper";
import {SETTINGS_SECURITY, SETTINGS_SECURITY_APPS_AND_SESSIONS} from "../../../../util/pathConstants";

describe("SecurityAndAccountAccess", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<SecurityAndAccountAccess/>, createMockRootState());
        expect(wrapper.text().includes("Manage your account’s security and keep track")).toBe(true);
        expect(wrapper.text().includes("Bảo mật")).toBe(true);
        expect(wrapper.text().includes("Ứng dụng và phiên")).toBe(true);
        expect(wrapper.text().includes("Connected accounts")).toBe(true);
    });

    it("should link to Security", () => {
        testClickOnLink(<SecurityAndAccountAccess/>, SETTINGS_SECURITY, 0);
    });

    it("should link to Apps and sessions", () => {
        testClickOnLink(<SecurityAndAccountAccess/>, SETTINGS_SECURITY_APPS_AND_SESSIONS, 1);
    });
});
