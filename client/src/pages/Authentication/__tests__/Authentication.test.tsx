import React from "react";
import {Button} from "@material-ui/core";
import {mountWithStore} from "../../../util/testHelper";
import Authentication from "../Authentication";
import RegistrationModal from "../../RegistrationModal/RegistrationModal";
import {ACCOUNT_LOGIN} from "../../../util/pathConstants";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe("Authentication", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Authentication/>);
        expect(wrapper.find(Button).at(0).text()).toEqual("Đăng ký");
        expect(wrapper.find(Button).at(1).text()).toEqual("Đăng nhập");
    });

    it("should render RegistrationModal on click Sign Up button", () => {
        const wrapper = mountWithStore(<Authentication/>);
        wrapper.find(Button).at(0).simulate("click");
        const registrationModal = wrapper.find(RegistrationModal);
        expect(registrationModal.exists()).toBe(true);
        expect(registrationModal.text().includes("Tạo tài khoản của bạn")).toBe(true);
    });

    it("should route to Login page on click Log In button", () => {
        const wrapper = mountWithStore(<Authentication/>);
        wrapper.find(Button).at(1).simulate("click");
        expect(mockHistoryPush).toHaveBeenCalledWith(ACCOUNT_LOGIN);
    });
});
