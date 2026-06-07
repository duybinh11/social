import React from "react";
import {Button, IconButton, Typography} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import UserPageTweets from "../UserPageTweets";
import {mockMyProfile, mockTweets, mockUserProfile} from "../../../util/mockData/mockData";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import AddTweetModal from "../../../components/AddTweetModal/AddTweetModal";
import CloseButton from "../../../components/CloseButton/CloseButton";
import {LoadingStatus} from "../../../store/types/common";

describe("UserPageTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockWithTweets = {
        ...mockRootState,
        userTweets: {...mockRootState.userTweets, items: mockTweets, pagesCount: 10}
    };

    it("should render Loading Spinner", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={0}
                page={0}
                loadUserTweets={jest.fn()}
            />, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tweet Components", () => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={0}
                page={0}
                loadUserTweets={jest.fn()}
            />, mockWithTweets);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render Add Tweet Modal on click Send button and close", () => {
        testAddTweetModal(0, "Đăng tweet");
    });

    it("should render Add Tweet Modal on click Tweet a photo button and close", () => {
        testAddTweetModal(2, "Đăng ảnh");
    });

    it("should render empty tweets message on Tweets tab my profile", () => {
        testTitleWithEmptyTweet(0, true, "Bạn chưa có tweet nào", "Khi bạn đăng tweet, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Tweets tab user profile", () => {
        testTitleWithEmptyTweet(0, false, `@${mockUserProfile.username} chưa có tweet nào`, "Khi họ đăng tweet, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Tweets & replies tab my profile", () => {
        testTitleWithEmptyTweet(1, true, "Bạn chưa có trả lời nào", "Khi bạn trả lời tweet, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Tweets & replies tab user profile", () => {
        testTitleWithEmptyTweet(1, false, `@${mockUserProfile.username} chưa có trả lời nào`, "Khi họ trả lời tweet, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Media tab my profile", () => {
        testTitleWithEmptyTweet(2, true, "Bạn chưa đăng ảnh nào", "Khi bạn đăng tweet có ảnh, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Media tab user profile", () => {
        testTitleWithEmptyTweet(2, false, `@${mockUserProfile.username} chưa đăng ảnh nào`, "Khi họ đăng ảnh, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Likes tab my profile", () => {
        testTitleWithEmptyTweet(3, true, "Bạn chưa thích tweet nào", "Nhấn trái tim trên bất kỳ tweet nào để thể hiện sự yêu thích. Khi bạn làm vậy, chúng sẽ hiện ở đây.")
    });

    it("should render empty tweets message on Likes tab user profile", () => {
        testTitleWithEmptyTweet(3, false, `@${mockUserProfile.username} chưa thích tweet nào`, "Khi họ thích tweet, chúng sẽ hiện ở đây.")
    });

    const testAddTweetModal = (activeTab: number, buttonText: string): void => {
        const wrapper = mountWithStore(<UserPageTweets activeTab={activeTab} page={0} loadUserTweets={jest.fn()}/>, mockRootState);

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        expect(wrapper.find(Button).at(0).text().includes(buttonText)).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);

        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");

        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    };

    const testTitleWithEmptyTweet = (activeTab: number, isUserProfile: boolean, title: string, text: string): void => {
        const wrapper = mountWithStore(
            <UserPageTweets
                activeTab={activeTab}
                page={0}
                loadUserTweets={jest.fn()}
            />, {
                ...mockRootState,
                userProfile: {
                    ...mockRootState.userProfile,
                    user: isUserProfile ? mockMyProfile : mockUserProfile
                }
            });
        expect(wrapper.find(Typography).at(0).text().includes(title)).toBe(true);
        expect(wrapper.find(Typography).at(1).text().includes(text)).toBe(true);
    };
});
