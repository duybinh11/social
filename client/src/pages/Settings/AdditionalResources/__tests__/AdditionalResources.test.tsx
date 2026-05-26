import React from "react";

import AdditionalResources from "../AdditionalResources";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";

describe("AdditionalResources", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AdditionalResources/>, createMockRootState());

        expect(wrapper.text().includes("Check out other places for helpful information to learn more about Twitter products and services.")).toBe(true);
        expect(wrapper.text().includes("Release notes")).toBe(true);
        expect(wrapper.text().includes("Privacy policy")).toBe(true);
        expect(wrapper.text().includes("Legal")).toBe(true);
        expect(wrapper.text().includes("Thông tin quảng cáo")).toBe(true);
        expect(wrapper.text().includes("Cookie Policy")).toBe(true);
        expect(wrapper.text().includes("Chính sách quyền riêng tư")).toBe(true);
        expect(wrapper.text().includes("Điều khoản dịch vụ")).toBe(true);
        expect(wrapper.text().includes("Miscellaneous")).toBe(true);
        expect(wrapper.text().includes("Giới thiệu")).toBe(true);
        expect(wrapper.text().includes("Quảng cáo")).toBe(true);
        expect(wrapper.text().includes("Blog")).toBe(true);
        expect(wrapper.text().includes("Tài nguyên thương hiệu")).toBe(true);
        expect(wrapper.text().includes("Tuyển dụng")).toBe(true);
        expect(wrapper.text().includes("Developers")).toBe(true);
    });
});
