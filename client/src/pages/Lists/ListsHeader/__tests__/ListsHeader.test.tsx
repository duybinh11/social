import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ListsHeader from "../ListsHeader";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import {IconButton} from "@material-ui/core";
import CreateListsModal from "../CreateListsModal/CreateListsModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";

describe("ListsHeader", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should open/close CreateListsModal", () => {
        const wrapper = mountWithStore(<ListsHeader/>, mockStore);
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(true);
        wrapper.find(CreateListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(CreateListsModal).prop("visible")).toBe(false);
    });
});
