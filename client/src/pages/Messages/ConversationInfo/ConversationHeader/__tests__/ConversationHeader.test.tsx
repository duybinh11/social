import React from "react";

import {mountWithStore} from "../../../../../util/testHelper";
import ConversationHeader from "../ConversationHeader";

describe("ConversationHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ConversationHeader/>);
        expect(wrapper.text().includes("Thông tin cuộc trò chuyện")).toBe(true);
    });
});
