import React from "react";
import {Button} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";
import Welcome from "../Welcome";
import {LoadingStatus} from "../../../store/types/common";

describe("Welcome", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Welcome/>, mockRootState);
        expect(wrapper.text().includes("Chào mừng đến Twitter!")).toBe(true);
        expect(wrapper.text().includes("This is the best place to see what’s happening in your world.")).toBe(true);
        expect(wrapper.find(Button).text().includes("Bắt đầu thôi")).toBe(true);
    });

    it("should click start use Twitter", () => {
        const wrapper = mountWithStore(<Welcome/>, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {payload: 2, type: UserActionsType.START_USE_TWITTER});
    });
});
