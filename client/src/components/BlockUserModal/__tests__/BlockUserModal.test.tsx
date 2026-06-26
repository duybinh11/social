import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import BlockUserModal from "../BlockUserModal";
import {LoadingStatus} from "../../../store/types/common";

describe("BlockUserModal", () => {

    it("should render Block user", () => {
        const wrapper = initializeWrapper(true, false);
        
        expect(wrapper.text().includes("Chặn")).toBe(true);
        expect(wrapper.text().includes("Họ sẽ không thể theo dõi hoặc xem bài viết của bạn, và bạn sẽ không thấy bài viết hay thông báo từ @John Doe.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Chặn")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Hủy")).toBe(true);
    });

    it("should render Unblock user", () => {
        const wrapper = initializeWrapper(true);

        wrapper.find(Dialog).simulate("click");

        expect(wrapper.text().includes("Bỏ chặn")).toBe(true);
        expect(wrapper.text().includes("Họ sẽ có thể theo dõi bạn và xem bài viết của bạn.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Bỏ chặn")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Hủy")).toBe(true);
    });
    
    it("should render empty BlockUserModal correctly", () => {
        const wrapper = initializeWrapper(false);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
    
    const initializeWrapper = (isVisible: boolean, isUserBlocked = true) => {
        return mountWithStore(
            <BlockUserModal
                username={"John Doe"}
                isUserBlocked={isUserBlocked}
                visible={isVisible}
                onClose={jest.fn()}
                onBlockUser={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADED));
    };
});
