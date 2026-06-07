import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import TweetReplyConversation from "../TweetReplyConversation";

describe("TweetReplyConversation", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetReplyConversation/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes("Bạn có thể trả lời cuộc trò chuyện này")).toBe(true);
    });
});
