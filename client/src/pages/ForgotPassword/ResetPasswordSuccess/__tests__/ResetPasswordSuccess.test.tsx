import React from "react";
import {createMemoryHistory} from "history";
import {Link as MuiLink} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import ResetPasswordSuccess from "../ResetPasswordSuccess";
import {ACCOUNT_LOGIN} from "../../../../util/pathConstants";

describe("ResetPasswordSuccess", () => {
    const mockStore = createMockRootState();
    
    it("should render correctly", (done) => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ResetPasswordSuccess/>, mockStore, history);
        wrapper.find(MuiLink).at(2).simulate("click", { button: 0 });

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_LOGIN);
            expect(wrapper.text().includes("Xong rồi. Bạn đã đổi mật khẩu thành công.")).toBe(true);
            expect(wrapper.text().includes("Hãy xem lại các ứng dụng có quyền truy cập tài khoản. Thu hồi quyền với ứng dụng không quen hoặc không còn dùng.")).toBe(true);
            expect(wrapper.text().includes("Điều này giúp bạn dễ dàng lấy lại tài khoản nếu bị khóa.")).toBe(true);
            expect(wrapper.text().includes("Tiếp tục vào Twitter")).toBe(true);
        });
    });
});
