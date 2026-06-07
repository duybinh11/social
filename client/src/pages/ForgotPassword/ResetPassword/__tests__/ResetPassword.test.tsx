import React from "react";
import {Avatar, Button} from "@material-ui/core";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {createMemoryHistory} from "history";
import routeData from "react-router";

import ResetPassword from "../ResetPassword";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {ForgotPasswordTextField} from "../../ForgotPasswordTextField/ForgotPasswordTextField";
import {API_AUTH_RESET} from "../../../../util/endpoints";
import {ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE, ACCOUNT_FORGOT_RESET_PASSWORD} from "../../../../util/pathConstants";

describe("ResetPassword", () => {
    const mockStore = createMockRootState();
    const mockUser = mockStore.user.data;
    const mockPassword = "1234567890";

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: ACCOUNT_FORGOT_RESET_PASSWORD, hash: "", search: "", state: {user: mockUser}
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ResetPassword/>, mockStore);

        expect(wrapper.text().includes("Đặt lại mật khẩu")).toBe(true);
        expect(wrapper.find(Avatar).prop("src")).toEqual(mockUser?.avatar.src);
        expect(wrapper.text().includes(`${mockUser?.fullName}`)).toBe(true);
        expect(wrapper.text().includes(`@${mockUser?.username}`)).toBe(true);
        expect(wrapper.text().includes("Nhập mật khẩu mới")).toBe(true);
        expect(wrapper.text().includes("Nhập lại mật khẩu")).toBe(true);
        expect(wrapper.text().includes("Đặt lại mật khẩu sẽ đăng xuất bạn khỏi mọi phiên Twitter đang hoạt động.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Đặt lại mật khẩu");
    });

    it("should render password errors", (done) => {
        const wrapper = mountWithStore(<ResetPassword/>, mockStore);
        const passwordInput = wrapper.find(ForgotPasswordTextField).find("input").at(0);
        const passwordInput2 = wrapper.find(ForgotPasswordTextField).find("input").at(1);
        passwordInput.simulate("change", {target: {value: "222"}});
        passwordInput2.simulate("change", {target: {value: "2223"}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.text().includes("Quá ngắn")).toBe(true);
            expect(wrapper.text().includes("Mật khẩu không khớp.")).toBe(true);
        });
    });

    it("should submit password reset", (done) => {
        const mock = new MockAdapter(axios);
        mock.onPost(API_AUTH_RESET, {
            email: mockUser?.email,
            password: mockPassword,
            password2: mockPassword
        }).reply(200);
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ResetPassword/>, mockStore, history);
        const passwordInput = wrapper.find(ForgotPasswordTextField).find("input").at(0);
        const passwordInput2 = wrapper.find(ForgotPasswordTextField).find("input").at(1);
        passwordInput.simulate("change", {target: {value: mockPassword}});
        passwordInput2.simulate("change", {target: {value: mockPassword}});
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE);
        });
    });
});
