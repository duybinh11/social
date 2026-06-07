import React from "react";

import {mountWithStore} from "../../../../../util/testHelper";
import ChatUserBlocked from "../ChatUserBlocked";

describe("ChatUserBlocked", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChatUserBlocked/>);
        expect(wrapper.text().includes("Bạn không thể gửi tin nhắn cho người này nữa.")).toBe(true);
        expect(wrapper.text().includes("Tìm hiểu thêm")).toBe(true);
    });
});
