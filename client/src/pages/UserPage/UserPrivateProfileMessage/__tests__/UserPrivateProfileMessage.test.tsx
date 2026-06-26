import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import UserPrivateProfileMessage from "../UserPrivateProfileMessage";

describe("UserPrivateProfileMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserPrivateProfileMessage/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("Các bài viết này được bảo vệ")).toBe(true);
    });
});
