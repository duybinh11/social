import React from "react";
import {Button} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import TweetComponentActionsModal from "../TweetComponentActionsModal";
import {LoadingStatus} from "../../../../store/types/common";

describe("TweetComponentActionsModal", () => {
    it("should render Delete Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Xóa", true);
        expect(wrapper.text().includes("Xóa bài viết?")).toBe(true);
        expect(wrapper.text().includes("This can’t be undone and it will be removed from your profile")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Xóa")).toBe(true);
    });

    it("should render Unpin Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Ghim", true);
        expect(wrapper.text().includes("Bỏ ghim bài viết khỏi hồ sơ?")).toBe(true);
        expect(wrapper.text().includes("Tweet sẽ không còn tự động hiện ở đầu hồ sơ của bạn.")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Bỏ ghim")).toBe(true);
    });

    it("should render Pin Tweet Action Modal", () => {
        const wrapper = createTweetComponentActionsModalWrapper("Ghim", false);
        expect(wrapper.text().includes("Ghim bài viết lên hồ sơ?")).toBe(true);
        expect(wrapper.text().includes("Bài viết sẽ hiện ở đầu hồ sơ và thay thế bài viết đã ghim trước đó.")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Ghim")).toBe(true);
    });

    const createTweetComponentActionsModalWrapper = (modalTitle: string, isTweetPinned: boolean) => {
        const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

        return mountWithStore(
            <TweetComponentActionsModal
                modalTitle={modalTitle}
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={true}
                onCloseTweetComponentActionsModal={jest.fn()}
                onClick={jest.fn()}
            />, mockRootState);
    };
});
