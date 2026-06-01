import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockLists, mockSimpleList, mockUserLists} from "../../../../util/mockData/mockData";
import DiscoverLists from "../DiscoverLists";
import Spinner from "../../../../components/Spinner/Spinner";
import ListsItem from "../../ListsItem/ListsItem";

describe("DiscoverLists", () => {
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

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<DiscoverLists/>, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Lists", () => {
        const wrapper = mountWithStore(<DiscoverLists/>, mockListsStore);
        expect(wrapper.find("#list").find(ListsItem).length).toEqual(3);
    });
});
