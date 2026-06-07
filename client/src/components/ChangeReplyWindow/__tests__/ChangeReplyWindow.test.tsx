import React from "react";
import {ListItem} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import ChangeReplyWindow from "../ChangeReplyWindow";
import {LoadingStatus, ReplyType} from "../../../store/types/common";

describe("ChangeReplyWindow", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly with EVERYONE reply", () => {
        testReply(ReplyType.EVERYONE, 0, "Mọi người");
    });

    it("should render correctly with FOLLOW reply", () => {
        testReply(ReplyType.FOLLOW, 1, "Người bạn theo dõi");
    });

    const testReply = (reply: ReplyType, itemIndex: number, text: string): void => {
        const mockOnChangeTweetReplyType = jest.fn();
        const wrapper = mountWithStore(
            <ChangeReplyWindow
                replyType={reply}
                onChangeTweetReplyType={mockOnChangeTweetReplyType}
            />, mockRootState);

        wrapper.find(ListItem).at(itemIndex).simulate("click");

        expect(wrapper.text().includes(text)).toBe(true);
        expect(mockOnChangeTweetReplyType).toHaveBeenCalled();
        expect(mockOnChangeTweetReplyType).toHaveBeenCalledWith(reply);
    };
});
