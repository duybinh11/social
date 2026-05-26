import React from "react";
import {Link as MuiLink} from "@material-ui/core";

import Spaces from "../Spaces";
import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {USING_TWITTER_SPACES} from "../../../../../util/url";

describe("Spaces", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Spaces/>, createMockRootState());
        expect(wrapper.text().includes("Manage who can see your Spaces listening activity")).toBe(true);
        expect(wrapper.text().includes("Cho phép người theo dõi xem Spaces bạn đang nghe")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(USING_TWITTER_SPACES);
    });
});
