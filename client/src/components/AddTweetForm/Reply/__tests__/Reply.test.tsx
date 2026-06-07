import React from "react";
import {Button, ListItem, Popover} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import ChangeReplyWindow from "../../../ChangeReplyWindow/ChangeReplyWindow";
import Reply from "../Reply";
import {LoadingStatus, ReplyType} from "../../../../store/types/common";

describe("Trả lời", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should click change reply type", () => {
        const mockSetReplyType = jest.fn();
        const wrapper = mountWithStore(
            <Reply
                replyType={ReplyType.EVERYONE}
                setReplyType={mockSetReplyType}
            />, mockRootState);
        
        expect(wrapper.find(Popover).prop("open")).toBe(false);

        wrapper.find(Button).simulate("click");

        expect(wrapper.find(Popover).prop("open")).toBe(true);
        
        wrapper.find(ChangeReplyWindow).find(ListItem).at(1).simulate("click");
        
        expect(wrapper.find(ChangeReplyWindow).find(ListItem).at(1).text()).toEqual("Người bạn theo dõi");
        expect(mockSetReplyType).toHaveBeenCalled();
        expect(mockSetReplyType).toHaveBeenCalledWith(ReplyType.FOLLOW);
        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
    });

    it("should render Everyone reply", () => {
        testReply(ReplyType.EVERYONE, "#everyoneReplyIcon", "Mọi người có thể trả lời");
    });

    it("should render People you follow reply", () => {
        testReply(ReplyType.FOLLOW, "#followReplyIcon", "Người bạn theo dõi");
    });

    const testReply = (replyType: ReplyType, replyIconId: string, buttonText: string): void => {
        const wrapper = mountWithStore(
            <Reply
                replyType={replyType}
                setReplyType={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(replyIconId).exists()).toBeTruthy();
        expect(wrapper.find(Button).text()).toEqual(buttonText);
    };
});
