import React from "react";
import {ClickAwayListener, IconButton} from "@material-ui/core";
import {createMemoryHistory} from "history";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import UserPageActions from "../UserPageActions";
import {mockUserProfile} from "../../../../util/mockData/mockData";
import ListsModal from "../../../../components/ListsModal/ListsModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import {LoadingStatus} from "../../../../store/types/common";
import {ActionSnackbarTypes} from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("UserPageActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click and open User Page Actions", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.text().includes(`Add/remove @${mockUserProfile.username} from Lists`)).toBe(true);
        expect(wrapper.text().includes("Sao chép liên kết hồ sơ")).toBe(true);
        expect(wrapper.text().includes(`Hạn chế @${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`Block @${mockUserProfile.username}`)).toBe(true);
    });

    it("should click open and close ListsModal", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find("#openListsModal").at(0).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });

    it("should click Copy Link To Profile", () => {
        const {wrapper} = createWrapper();
        wrapper.find("#copyLinkToProfile").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Đã sao chép vào bộ nhớ tạm",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click handle Mute User", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.find(".makeStyles-dropdown-25").exists()).toBeTruthy();
        wrapper.find("#handleMuteUser").at(0).simulate("click");
        expect(wrapper.find(".makeStyles-dropdown-25").exists()).toBeFalsy();
    });

    it("should click away UserPageActions", () => {
        const {wrapper} = createWrapper();
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    it("should hover More icon and render Hover Action", () => {
        jest.useFakeTimers();
        const {wrapper} = createWrapper();
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Thêm");
    });

    it("should render muted user", () => {
        const {wrapper} = createWrapper(true, false);
        expect(wrapper.text().includes(`Bỏ hạn chế @${mockUserProfile.username}`)).toBe(true);
    });

    it("should render bocked user", () => {
        const {wrapper} = createWrapper(true, true);
        expect(wrapper.text().includes(`Unblock @${mockUserProfile.username}`)).toBe(true);
    });

    const createWrapper = (isUserMuted = false, isUserBlocked = false) => {
        const mockState = {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: {
                    ...mockUserProfile, isUserMuted, isUserBlocked
                }
            }
        };
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserPageActions/>, mockState, history);
        wrapper.find(IconButton).simulate("click");
        return {wrapper, pushSpy};
    };
});
