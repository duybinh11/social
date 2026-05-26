import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import HoverAction from "../HoverAction";
import {LoadingStatus} from "../../../store/types/common";

describe("HoverAction", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render visible HoverAction", () => {
        const wrapper = mountWithStore(<HoverAction visible={true} positionTop={true} actionText={"Thích"} />, mockRootState);

        expect(wrapper.find("div").exists()).toBeTruthy();
        expect(wrapper.find("#action-text").text().includes("Thích")).toBe(true);
    });

    it("should render empty HoverAction", () => {
        const wrapper = mountWithStore(<HoverAction visible={false} positionTop={false} actionText={"Thích"} />, mockRootState);

        expect(wrapper.find("div").exists()).toBeFalsy();
    });
});
