import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {Link} from "react-router-dom";
import {Avatar, Button, IconButton, Popover, TextareaAutosize} from "@material-ui/core";
import {createMemoryHistory} from "history";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import AddTweetForm from "../AddTweetForm";
import {mockFullTweet, mockMyProfile, mockQuoteTweet, mockUser} from "../../../util/mockData/mockData";
import {PROFILE} from "../../../util/pathConstants";
import HoverAction from "../../HoverAction/HoverAction";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import Poll from "../Poll/Poll";
import PollInput from "../Poll/PollInput/PollInput";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import {API_USER_UPLOAD_IMAGE} from "../../../util/endpoints";
import {LoadingStatus, ReplyType} from "../../../store/types/common";
import EmojiIconButton from "../EmojiIconButton/EmojiIconButton";
import {ActionSnackbarTypes} from "../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("AddTweetForm", () => {
    const mock = new MockAdapter(axios);
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockTestMessage = "test";
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"} buttonName={"Đăng"}/>, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.find(Link).prop("to")).toBe(`${PROFILE}/${mockUser.id}`);
        expect(wrapper.find(TextareaAutosize).prop("placeholder")).toBe("Chuyện gì đang xảy ra?");
        expect(wrapper.find(Button).at(1).text()).toEqual("Đăng");
    });

    it("should add Tweet", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"} buttonName={"Đăng"}/>, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Popover).at(1).prop("open")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: mockTestMessage}});

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe(mockTestMessage);

        wrapper.find(EmojiIconButton).find(IconButton).simulate("click");

        expect(wrapper.find(Popover).at(1).prop("open")).toBe(true);

        wrapper.find(".emoji-mart-category-list").at(1).find("li").at(0).find("button").simulate("click");
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: `${mockTestMessage} :+1:`,
                    images: [],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetsActionType.ADD_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet with Poll", (done) => {
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"} buttonName={"Đăng"}/>, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Poll).prop("visiblePoll")).toBe(false);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: mockTestMessage}});

        wrapper.find(IconButton).at(2).simulate("click");

        expect(wrapper.find(Poll).prop("visiblePoll")).toBe(true);

        wrapper.find(Poll).find(PollInput).at(0).find("input").at(0).simulate("change", {target: {value: "test poll 1"}});
        wrapper.find(Poll).find(PollInput).at(1).find("input").at(0).simulate("change", {target: {value: "test poll 2"}});
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: mockTestMessage,
                    images: [],
                    pollDateTime: 1440,
                    choices: ["test poll 1", "test poll 2"],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetsActionType.ADD_POLL
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet with Quote", (done) => {
        const wrapper = mountWithStore(
            <AddTweetForm
                quoteTweet={mockQuoteTweet}
                title={"Chuyện gì đang xảy ra?"}
                buttonName={"Đăng"}
                onCloseModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(IconButton).at(2).prop("disabled")).toBe(true);

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: mockTestMessage}});
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    text: mockTestMessage,
                    images: [mockFullTweet.images[0]],
                    replyType: ReplyType.EVERYONE,
                    tweetId: 13,
                }, type: TweetsActionType.ADD_QUOTE_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should add Tweet reply", (done) => {
        const wrapper = mountWithStore(
            <AddTweetForm
                title={"Chuyện gì đang xảy ra?"}
                buttonName={"Trả lời"}
                addressedUsername={mockMyProfile.username}
                addressedId={mockMyProfile.id}
                tweetId={13}
                onCloseModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(TextareaAutosize).prop("value")).toBe("");
        expect(wrapper.find(Button).at(1).text()).toBe("Trả lời");

        wrapper.find(TextareaAutosize).find("textarea").at(0).simulate("change", {target: {value: mockTestMessage}});
        mock.onPost(API_USER_UPLOAD_IMAGE).reply(200, mockFullTweet.images[0]);
        wrapper.find(Button).at(1).simulate("click");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    tweetId: 13,
                    text: mockTestMessage,
                    addressedUsername: mockMyProfile.username,
                    addressedId: mockMyProfile.id,
                    images: [mockFullTweet.images[0]],
                    replyType: ReplyType.EVERYONE,
                }, type: TweetActionType.FETCH_REPLY_TWEET
            });
            expect(mockDispatchFn).nthCalledWith(2, {
                payload: "Your tweet was sent.",
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
            });
        });
    });

    it("should click open and close Popup", () => {
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"} buttonName={"Đăng"}/>, mockRootState);

        wrapper.find(EmojiIconButton).find(IconButton).simulate("click");

        expect(wrapper.find(Popover).at(1).prop("open")).toBe(true);
        // @ts-ignore
        wrapper.find(Popover).at(1).prop("onClose")(jest.fn());
    });

    it("should click Link and render user profile", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"}
                                                     buttonName={"Đăng"}/>, mockRootState, history);

        wrapper.find(Link).simulate("click", {button: 0});

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/2`);
    });

    it("should hover Media icon and render Hover Action", () => {
        testHoverIcon(0, "Phương tiện");
    });

    it("should hover Poll icon and render Hover Action", () => {
        testHoverIcon(1, "Bình chọn");
    });

    it("should hover Emoji icon and render Hover Action", () => {
        testHoverIcon(2, "Emoji");
    });

    const testHoverIcon = (itemIndex: number, actionText: string): void => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<AddTweetForm title={"Chuyện gì đang xảy ra?"} buttonName={"Đăng"}/>, mockRootState);
        wrapper.find(IconButton).at(itemIndex).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).at(itemIndex).prop("actionText")).toBe(actionText);

        wrapper.find(IconButton).at(itemIndex).simulate("mouseleave");

        expect(wrapper.find(HoverAction).at(itemIndex).prop("visible")).toBe(false);
    };
});
