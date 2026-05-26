import React from "react";

import Languages from "../Languages";
import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {mockUser} from "../../../../../util/mockData/mockData";

describe("Ngôn ngữ", () => {
    
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Languages/>, createMockRootState());

        expect(wrapper.text().includes("Quản lý ngôn ngữ dùng để cá nhân hóa trải nghiệm Twitter của bạn.")).toBe(true);
        expect(wrapper.text().includes("Ngôn ngữ hiển thị")).toBe(true);
        expect(wrapper.text().includes("Chọn thêm ngôn ngữ")).toBe(true);
        expect(wrapper.text().includes(mockUser.language)).toBe(true);
    });
});
