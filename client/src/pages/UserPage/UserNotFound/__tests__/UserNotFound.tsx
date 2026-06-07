import {Avatar} from "@material-ui/core";
import React from "react";

import BackButton from "../../../../components/BackButton/BackButton";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import UserNotFound from "../UserNotFound";

describe("UserNotFound", () => {

    it("should render UserNotFound", () => {
        const wrapper = mountWithStore(<UserNotFound/>, createMockRootState());

        expect(wrapper.find(BackButton).exists()).toBeTruthy();
        expect(wrapper.find(Avatar).exists()).toBeTruthy();
        expect(wrapper.text().includes("Hồ sơ")).toBe(true);
        expect(wrapper.text().includes("Tài khoản này không tồn tại")).toBe(true);
        expect(wrapper.text().includes("Hãy thử tìm tài khoản khác.")).toBe(true);
    });
});
