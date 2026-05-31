import React from "react";

import ContentYouSee from "../ContentYouSee";
import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";

describe("ContentYouSee", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentYouSee/>, createMockRootState());

        expect(wrapper.text().includes("Quyết định nội dung bạn thấy trên Twitter dựa trên sở thích và mối quan tâm của bạn")).toBe(true);
        expect(wrapper.text().includes("Display media that may contain sensitive content")).toBe(true);
        expect(wrapper.text().includes("Chủ đề")).toBe(true);
        expect(wrapper.text().includes("Interests")).toBe(true);
        expect(wrapper.text().includes("Explore settings")).toBe(true);
        expect(wrapper.text().includes("Search settings")).toBe(true);
    });
});
