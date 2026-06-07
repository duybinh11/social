import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import EmptyNotifications from "../EmptyNotifications";
import {LoadingStatus} from "../../../../store/types/common";

describe("EmptyNotifications", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render empty Notification message", () => {
        const wrapper = mountWithStore(<EmptyNotifications isNotification={true} />, mockStore);
        expect(wrapper.text().includes("Chưa có gì để xem")).toBe(true);
        expect(wrapper.text().includes("Từ lượt thích đến đăng lại và nhiều hơn nữa, đây là nơi mọi hoạt động diễn ra.")).toBe(true);
    });
    
    it("should render empty Mentions message", () => {
        const wrapper = mountWithStore(<EmptyNotifications isNotification={false} />, mockStore);
        expect(wrapper.text().includes("Chưa có gì để xem")).toBe(true);
        expect(wrapper.text().includes("Khi ai đó nhắc đến bạn, bạn sẽ thấy ở đây.")).toBe(true);
    });
});
