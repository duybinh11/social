import React from "react";
import format from "date-fns/format";
import viLang from "date-fns/locale/vi/index";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import TweetDate from "../TweetDate";

describe("TweetDate", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetDate/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(format(new Date(mockFullTweet.dateTime), "HH:mm", {locale: viLang}))).toBe(true);
        expect(wrapper.text().includes(format(new Date(mockFullTweet.dateTime), " d MMM yyyy", {locale: viLang}))).toBe(true);
        expect(wrapper.text().includes("Twitter")).toBe(false);
    });
});
