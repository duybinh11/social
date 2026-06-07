import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import StartConversation from "../StartConversation";

describe("StartConversation", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<StartConversation/>, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.text().includes("Gửi tin nhắn, nhận tin nhắn")).toBe(true);
        expect(wrapper.text().includes("Bắt đầu trò chuyện")).toBe(true);
    });
});
