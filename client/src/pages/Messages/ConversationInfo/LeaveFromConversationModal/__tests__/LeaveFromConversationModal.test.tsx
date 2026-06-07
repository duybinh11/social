import React from "react";
import {Dialog} from "@material-ui/core";

import {mountWithStore} from "../../../../../util/testHelper";
import LeaveFromConversationModal from "../LeaveFromConversationModal";

describe("LeaveFromConversationModal", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <LeaveFromConversationModal
                handleLeaveFromConversation={jest.fn()}
                onClose={jest.fn()}
                visible
            />);
        expect(wrapper.text().includes("Rời cuộc trò chuyện?")).toBe(true);
        expect(wrapper.text().includes("Cuộc trò chuyện sẽ bị xóa khỏi hộp thư của bạn.")).toBe(true);
    });

    it("should render empty Dialog", () => {
        const wrapper = mountWithStore(
            <LeaveFromConversationModal
                handleLeaveFromConversation={jest.fn()}
                onClose={jest.fn()}
                visible={false}
            />);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
