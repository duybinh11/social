import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus, ReplyType} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetReplyInfo from "../TweetReplyInfo";

describe("TweetReplyInfo", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render empty TweetReplyInfo", () => {
        const wrapper = mountWithStore(<TweetReplyInfo/>, mockRootState);
        expect(wrapper.find("#followReplyIcon").exists()).toBeFalsy();
    });

    it("should render FOLLOW TweetReplyInfo", () => {
        const mockState = {
            ...mockRootState,
            tweet: {...mockRootState.tweet,
                tweet: {
                    ...mockFullTweet, replyType: ReplyType.FOLLOW,
                }
            }
        };
        const wrapper = mountWithStore(<TweetReplyInfo/>, mockState);
        expect(wrapper.find("#followReplyIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`People @${mockFullTweet.user.fullName} follows can reply`)).toBe(true);
    });
});
