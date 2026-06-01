import React from "react";
import {Link} from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import Spinner from "../../Spinner/Spinner";
import {mockTags} from "../../../util/mockData/mockData";
import {createMemoryHistory} from "history";
import {HOME_TRENDS} from "../../../util/pathConstants";
import TagItem from "../TagItem/TagItem";
import Tags from "../Tags";
import {LoadingStatus} from "../../../store/types/common";

describe("Tags", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = {...mockRootState, tags: {...mockRootState.tags, tags: mockTags}}

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Tags/>, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.text().includes("Xu hướng dành cho bạn")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tags", () => {
        const wrapper = mountWithStore(<Tags/>, mockState);
        expect(wrapper.find(TagItem).length).toEqual(3);
        expect(wrapper.text().includes("Xem thêm")).toBe(true);
    });

    it("should click trends link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Tags/>, mockState, history);

        wrapper.find(Link).at(3).simulate("click", {button: 0});

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(HOME_TRENDS);
    });
});
