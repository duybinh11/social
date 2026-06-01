import React, {Component} from "react";
import {Route} from "react-router-dom";
import routeData from "react-router";
import {ReactWrapper} from "enzyme";
import {ListItem} from "@material-ui/core";

import Settings from "../Settings";
import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {
    SETTINGS,
    SETTINGS_INFO,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_PASSWORD
} from "../../../util/pathConstants";
import Account from "../Account/Account";
import AccountInformation from "../Account/AccountInformation/AccountInformation";
import ChangeUsername from "../Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "../Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "../Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "../Account/AccountInformation/ChangeCountry/ChangeCountry";
import ChangeYourPassword from "../Account/ChangeYourPassword/ChangeYourPassword";
import {LoadingStatus} from "../../../store/types/common";

describe("Cài đặt", () => {

    it("should navigate to Your account", () => {
        testNavigation(SETTINGS, "Tài khoản của bạn", 0);
    });

    it("should navigate back to Your account", () => {
        testNavigation(SETTINGS_INFO, "Tài khoản của bạn", 0);
    });

    it("should click and navigate to Your account", () => {
        testClickNavigation("Tài khoản của bạn", 0);
    });

    it("should route correctly", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "", hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps: any = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

        expect(pathMap[SETTINGS]).toBe(Account);
        expect(pathMap[SETTINGS_INFO]).toBe(AccountInformation);
        expect(pathMap[SETTINGS_INFO_USERNAME]).toBe(ChangeUsername);
        expect(pathMap[SETTINGS_INFO_PHONE]).toBe(ChangePhone);
        expect(pathMap[SETTINGS_INFO_EMAIL]).toBe(ChangeEmail);
        expect(pathMap[SETTINGS_INFO_COUNTRY]).toBe(ChangeCountry);
        expect(pathMap[SETTINGS_PASSWORD]).toBe(ChangeYourPassword);
    });

    const testNavigation = (pathname: string, mockText: string, itemIndex: number): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: pathname, hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        testListItems(wrapper, mockText, itemIndex);
    };

    const testClickNavigation = (mockText: string, itemIndex: number): void => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "", hash: "", search: "", state: ""
        });
        const wrapper = createWrapper();
        wrapper.find(ListItem).at(itemIndex).simulate("click");
        testListItems(wrapper, mockText, itemIndex);
    };

    const createWrapper = (): ReactWrapper<any, Component["state"], Component> => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        return mountWithStore(<Settings/>, mockStore);
    };

    const testListItems = (wrapper: ReactWrapper<any, Component["state"], Component>, mockText: string, itemIndex: number): void => {
        expect(wrapper.find(ListItem).at(itemIndex).prop("selected")).toBe(true);
        expect(wrapper.find(ListItem).at(itemIndex).text().includes(mockText)).toBe(true);
    };
});
