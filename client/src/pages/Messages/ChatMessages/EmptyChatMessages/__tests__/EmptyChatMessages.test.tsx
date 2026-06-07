import React from "react";
import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import EmptyChatMessages from "../EmptyChatMesseges";

describe("EmptyChatMessages", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<EmptyChatMessages/>, mockRootState);
        expect(wrapper.text().includes("Chọn tin nhắn")).toBe(true);
        expect(wrapper.text().includes("Chọn một cuộc trò chuyện từ danh sách bên trái")).toBe(true);
    });
});
