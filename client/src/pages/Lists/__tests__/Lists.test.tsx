import React from "react";
import routeData from "react-router";
import {IconButton} from "@material-ui/core";

import Lists from "../Lists";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {ListsActionType} from "../../../store/ducks/lists/contracts/actionTypes";
import Spinner from "../../../components/Spinner/Spinner";
import {mockLists, mockSimpleList, mockUser, mockUserLists} from "../../../util/mockData/mockData";
import ListsItem from "../ListsItem/ListsItem";
import CreateListsModal from "../ListsHeader/CreateListsModal/CreateListsModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {LISTS} from "../../../util/pathConstants";
import {LoadingStatus} from "../../../store/types/common";

window.scrollTo = jest.fn();

describe("Danh sách", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListsStore = {
        ...mockStore,
        lists: {
            ...mockStore.lists,
            lists: mockLists,
            userLists: mockUserLists,
            simpleLists: mockSimpleList
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: LISTS, hash: "", search: "", state: ""
        });
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Lists/>, createMockRootState());

        expect(global.window.document.title).toBe("Lists / Twitter");
        expect(wrapper.find(Spinner).at(0).exists()).toBe(true);
        expect(wrapper.find(Spinner).at(1).exists()).toBe(true);
        expect(wrapper.text().includes("Discover new Lists")).toBe(true);
        expect(wrapper.text().includes("Your Lists")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {type: ListsActionType.FETCH_LISTS});
        expect(mockDispatchFn).nthCalledWith(2, {type: ListsActionType.FETCH_USER_LISTS});
    });

    it("should render Lists", () => {
        const wrapper = mountWithStore(<Lists/>, mockListsStore);

        expect(wrapper.text().includes("Danh sách")).toBe(true);
        expect(wrapper.text().includes(`${mockUser.username}`)).toBe(true);
        expect(wrapper.find("#list").find(ListsItem).length).toEqual(3);
        expect(wrapper.find("#userLists").find(ListsItem).length).toEqual(1);
    });

    it("should open Create List Modal", () => {
        const wrapper = mountWithStore(<Lists/>, mockListsStore);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.find(CreateListsModal).exists()).toBe(true);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(true);
    });

    it("should close Create List Modal", () => {
        const wrapper = mountWithStore(<Lists/>, mockListsStore);
        wrapper.find(IconButton).simulate("click");
        wrapper.find(CreateListsModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(CreateListsModal).exists()).toBe(true);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
    });

    it("should hover create list icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Lists/>, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Create");
    });

    it("should reset Lists State", () => {
        const wrapper = mountWithStore(<Lists/>, mockListsStore);
        wrapper.unmount();

        expect(mockDispatchFn).nthCalledWith(3, {type: ListsActionType.RESET_LISTS_STATE});
    });
});
