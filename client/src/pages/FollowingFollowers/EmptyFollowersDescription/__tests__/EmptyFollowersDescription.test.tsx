import React from "react";
import {Button} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import EmptyFollowersDescription from "../EmptyFollowersDescription";
import {mockUserProfile} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../../store/types/common";

describe("EmptyFollowersDescription", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render my profile following empty message", () => {
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={0}/>, mockRootState);
        expect(wrapper.text().includes("Bạn chưa theo dõi ai")).toBe(true);
        expect(wrapper.text().includes("Khi bạn theo dõi, họ sẽ hiện ở đây và bài viết của họ sẽ xuất hiện trên dòng thời gian.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Tìm người để theo dõi");
    });

    it("should render my profile followers empty message", () => {
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={1}/>, mockRootState);
        expect(wrapper.text().includes("Bạn chưa có người theo dõi")).toBe(true);
        expect(wrapper.text().includes("Khi ai đó theo dõi bạn, bạn sẽ thấy họ ở đây.")).toBe(true);
    });

    it("should render user profile following empty message", () => {
        const mockState = {...mockRootState, userProfile: {...mockRootState.userProfile, user: mockUserProfile}}
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={0}/>, mockState);
        expect(wrapper.text().includes(`@${mockUserProfile.username} isn’t following anyone`)).toBe(true);
        expect(wrapper.text().includes("Khi họ theo dõi, họ sẽ hiện ở đây.")).toBe(true);
    });

    it("should render user profile followers empty message", () => {
        const mockState = {...mockRootState, userProfile: {...mockRootState.userProfile, user: mockUserProfile}}
        const wrapper = mountWithStore(<EmptyFollowersDescription activeTab={1}/>, mockState);
        expect(wrapper.text().includes(`@${mockUserProfile.username} doesn’t have any followers`)).toBe(true);
        expect(wrapper.text().includes("Khi ai đó theo dõi họ, họ sẽ hiện ở đây.")).toBe(true);
    });
});
