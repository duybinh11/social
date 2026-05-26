import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import Bookmarks from "../../Bookmarks";
import BookmarksHeader from "../BookmarksHeader";

describe("BookmarksHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<BookmarksHeader/>, createMockRootState());
        expect(wrapper.text().includes("Dấu trang")).toBe(true);
        expect(wrapper.text().includes("@Cat")).toBe(true);
    });
});
