import React from "react";
import routeData from "react-router";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {NOTIFICATIONS} from "../../../util/pathConstants";
import Notifications from "../Notifications";
import {LoadingStatus} from "../../../store/types/common";

window.scrollTo = jest.fn();

describe("Thông báo", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: NOTIFICATIONS,
            hash: "",
            search: "",
            state: undefined
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Notifications/>, mockStore);
        expect(wrapper.text().includes("Thông báo")).toBe(true);
    });
});
