import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockFullTweet} from "../../../util/mockData/mockData";
import SmallLinkPreview from "../SmallLinkPreview";
import {LoadingStatus} from "../../../store/types/common";

describe("SmallLinkPreview", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render link preview", () => {
        const wrapper = mountWithStore(
            <SmallLinkPreview
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                isFullTweet
            />, mockRootState);
        expect(wrapper.text().includes(mockFullTweet.linkTitle)).toBe(true);
        expect(wrapper.text().includes("www.youtube.com")).toBe(true);
    });

    it("should render site link", () => {
        const wrapper = mountWithStore(
            <SmallLinkPreview
                link={mockFullTweet.link}
                linkTitle={mockFullTweet.linkTitle}
                linkDescription={mockFullTweet.linkDescription}
                linkCover={mockFullTweet.linkCover}
                isFullTweet={false}
            />, mockRootState);
        expect(wrapper.find("a").prop("href")).toBe(mockFullTweet.link);
    });
});
