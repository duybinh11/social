import React from "react";
import {InputLabel} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {TweetInputField} from "../TweetInputField";
import TweeterInput from "../TweeterInput";
import {LoadingStatus} from "../../../../store/types/common";

describe("TweeterInput", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should focus and blur input field", () => {
        const wrapper = mountWithStore(
            <TweeterInput
                onChange={jest.fn()}
                value={undefined}
                name={"username"}
                label={"Tên"}
                maxTextLength={50}
            />, mockRootState);

        expect(wrapper.text().includes("Tên")).toBe(true);

        wrapper.find(TweetInputField).at(0).find("input").at(0).simulate("focus");
        expect(wrapper.find(InputLabel).at(1).text().includes("0 / 50")).toBe(true);

        wrapper.find(TweetInputField).at(0).find("input").at(0).simulate("blur");
        expect(wrapper.find(InputLabel).at(1).exists()).toBeFalsy();
    });

    it("should render TweeterInput Bio", () => {
        const wrapper = mountWithStore(
            <TweeterInput
                onChange={jest.fn()}
                value={"50"}
                name={"username"}
                label={"Tiểu sử"}
                maxTextLength={50}
            />, mockRootState);

        wrapper.find(TweetInputField).at(0).find("textarea").at(0).simulate("focus");

        expect(wrapper.text().includes("Tiểu sử")).toBe(true);
        expect(wrapper.find(InputLabel).at(1).text().includes("2 / 50")).toBe(true);
        expect(wrapper.find(TweetInputField).prop("multiline")).toBe(true);
        expect(wrapper.find(TweetInputField).prop("rows")).toBe(3);
    });
});
