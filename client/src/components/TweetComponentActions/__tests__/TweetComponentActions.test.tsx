import React from "react";
import {Button, ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {mockFullTweet, mockMyTweetAdditionalInfo, mockUserTweetAdditionalInfo} from "../../../util/mockData/mockData";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import {TweetsActionType} from "../../../store/ducks/tweets/contracts/actionTypes";
import TweetComponentActions from "../TweetComponentActions";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";
import {TweetActionType} from "../../../store/ducks/tweet/contracts/actionTypes";
import ListsModal from "../../ListsModal/ListsModal";
import CloseButton from "../../CloseButton/CloseButton";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import {LoadingStatus, ReplyType} from "../../../store/types/common";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {ActionSnackbarTypes} from "../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("TweetComponentActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUserTweetState = {
        ...mockRootState,
        tweetAdditionalInfo: {...mockRootState.tweetAdditionalInfo, tweetAdditionalInfo: mockUserTweetAdditionalInfo}
    }
    const mockMyTweetState = {
        ...mockRootState,
        tweetAdditionalInfo: {...mockRootState.tweetAdditionalInfo, tweetAdditionalInfo: mockMyTweetAdditionalInfo}
    }
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render another user tweet actions", () => {
        const {wrapper} = createTweetComponentActionsWrapper();
        expect(wrapper.find(List).exists()).toBeFalsy();
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find(List).exists()).toBeTruthy();
        expect(wrapper.find("#muteIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`Mute @${mockUserTweetAdditionalInfo.user.username}`)).toBe(true);
        expect(wrapper.find("#blockIcon").exists()).toBeTruthy();
        expect(wrapper.text().includes(`Block @${mockUserTweetAdditionalInfo.user.username}`)).toBe(true);
        expect(wrapper.text().includes("Embed Tweet")).toBe(true);
        expect(wrapper.text().includes("Report Tweet")).toBe(true);
    });

    it("should render my profile tweet actions", () => {
        const {wrapper} = createTweetComponentActionsWrapper(mockMyTweetState);
        expect(wrapper.find(List).exists()).toBeFalsy();
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find(List).exists()).toBeTruthy();
        expect(wrapper.text().includes("Xóa")).toBe(true);
        expect(wrapper.text().includes("Ghim lên hồ sơ")).toBe(true);
        expect(wrapper.text().includes(`Add/remove @${mockMyTweetAdditionalInfo.user.username} from Lists`)).toBe(true);
        expect(wrapper.text().includes("Change who can reply")).toBe(true);
        expect(wrapper.text().includes("Embed Tweet")).toBe(true);
    });

    it("should render unpin tweet action", () => {
        const {wrapper} = createTweetComponentActionsWrapper(mockMyTweetState);
        wrapper.find(ActionIconButton).at(0).find(IconButton).simulate("click");
        expect(wrapper.text().includes("Ghim lên hồ sơ")).toBe(true);
    });

    it("should click open and close Delete Tweet Component Actions Modal", () => {
        testTweetComponentActionsModal("#delete", 0, "Xóa");
    });

    it("should click open and close Pin Tweet Component Actions Modal", () => {
        testTweetComponentActionsModal("#pin", 1, "Pin");
    });

    it("should click EVERYONE can reply", () => {
        testClickChangeReplyType(0, ReplyType.EVERYONE, "Everyone can reply now");
    });

    it("should click FOLLOW can reply", () => {
        testClickChangeReplyType(1, ReplyType.FOLLOW, "People you follow can reply now");
    });

    it("should click Pin Tweet", () => {
        testPinTweet(9, "Your Tweet was pinned to your profile.");
    });

    it("should click Unpin Tweet", () => {
        testPinTweet(102, "Your Tweet was unpinned from your profile.");
    });

    it("should click Delete Tweet", () => {
        // const mockTweet = {...mockFullTweet, id: 102, user: {...mockFullTweet.user, id: 2}}
        testDeleteTweet(mockMyTweetState, TweetsActionType.FETCH_DELETE_TWEET);
    });

    it("should click Delete Tweet Reply", () => {
        const mockMyTweetState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {...mockMyTweetAdditionalInfo, addressedTweetId: 9}
            }
        }
        testDeleteTweet(mockMyTweetState, TweetActionType.DELETE_TWEET_REPLY);
    });

    it("should click follow user", () => {
        testClickFollow("#handleFollow", "Theo dõi", UserActionsType.FOLLOW_USER);
    });

    it("should click unfollow user", () => {
        const mockUserTweetState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {...mockUserTweetAdditionalInfo.user, isFollower: true}
                }
            }
        };
        testClickFollow("#handleFollow", "Bỏ theo dõi", UserActionsType.UNFOLLOW_USER, mockUserTweetState);
    });

    it("should click open and close List Modal", () => {
        const {wrapper} = createTweetComponentActionsWrapper();
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find("#openListsModal").at(0).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        expect(wrapper.text().includes(`Add/remove @${mockUserTweetAdditionalInfo.user.username} from Lists`)).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });

    it("should click Mute user", () => {
        testClickMuteUser("#muteIcon", "Tắt tiếng", "muted");
    });

    it("should click Unmute user", () => {
        const mockUserTweetState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {...mockUserTweetAdditionalInfo.user, isUserMuted: true}
                }
            }
        };
        testClickMuteUser("#unmuteIcon", "Bật tiếng", "unmuted", mockUserTweetState);
    });

    it("should click Block user", () => {
        testClickBlockUser("#blockIcon", "Chặn", "blocked");
    });

    it("should click Unblock user", () => {
        const mockUserTweetState = {
            ...mockRootState,
            tweetAdditionalInfo: {
                ...mockRootState.tweetAdditionalInfo,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {...mockUserTweetAdditionalInfo.user, isUserBlocked: true}
                }
            }
        };
        testClickBlockUser("#unblockIcon", "Bỏ chặn", "unblocked", mockUserTweetState);
    });

    it("should click open and close BlockUserModal", () => {
        const {wrapper} = createTweetComponentActionsWrapper();
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should click away TweetComponentActions", () => {
        const {wrapper} = createTweetComponentActionsWrapper();
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    const testClickChangeReplyType = (listItem: number, replyType: ReplyType, snackbarText: string): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockMyTweetState);
        expect(wrapper.find(ChangeReplyWindow).exists()).toBeFalsy();
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#clickReplyDropdown").at(0).simulate("click");
        expect(wrapper.find(ChangeReplyWindow).exists()).toBeTruthy();
        wrapper.find(ChangeReplyWindow).find(ListItem).at(listItem).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: {tweetId: 9, replyType: replyType},
            type: TweetsActionType.CHANGE_REPLY_TYPE
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: snackbarText,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };

    const testTweetComponentActionsModal = (itemId: string, index: number, modalTitle: string): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockMyTweetState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).at(index).prop("visibleTweetComponentActionsModal")).toBe(false);
        wrapper.find(itemId).at(index).simulate("click");
        expect(wrapper.find(TweetComponentActionsModal).at(index).prop("visibleTweetComponentActionsModal")).toBe(true);
        expect(wrapper.find(TweetComponentActionsModal).at(index).prop("modalTitle")).toBe(modalTitle);
        wrapper.find(TweetComponentActionsModal).find(Button).at(index).simulate("click");
    };

    const testPinTweet = (tweetId: number, snackbarText: string): void => {
        const wrapper = mountWithStore(
            <TweetComponentActions
                tweetId={tweetId}
                isFullTweet
            />, mockMyTweetState);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#pin").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {payload: tweetId, type: UserActionsType.FETCH_PIN_TWEET});
        expect(mockDispatchFn).nthCalledWith(4, {payload: snackbarText, type: ActionSnackbarTypes.SET_OPEN_SNACKBAR});
    };

    const testDeleteTweet = (mockState: any, actionType: TweetActionType | TweetsActionType): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockState);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#delete").at(0).simulate("click");
        wrapper.find(TweetComponentActionsModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {payload: 9, type: actionType});
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: "Your Tweet was deleted",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };

    const testClickFollow = (iconIndex: string, text: string, actionType: UserActionsType, mockState = mockUserTweetState): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        wrapper.find("#handleFollow").at(0).simulate("click");
        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockUserTweetAdditionalInfo.user.username}`)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(3, {payload: {userId: 1, tweetId: 9}, type: actionType});
    };

    const testClickMuteUser = (iconIndex: string, text: string, snackbarText: string, mockState = mockUserTweetState): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockState);
        wrapper.find(IconButton).simulate("click");
        wrapper.find("#onMuteUser").at(0).simulate("click");
        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockUserTweetAdditionalInfo.user.username}`)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: {userId: 1, tweetId: 9},
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: `@${mockUserTweetAdditionalInfo.user.username} has been ${snackbarText}.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };

    const testClickBlockUser = (iconIndex: string, text: string, snackbarText: string, mockState = mockUserTweetState): void => {
        const {wrapper} = createTweetComponentActionsWrapper(mockState);
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        expect(wrapper.find(iconIndex).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${text} @${mockUserTweetAdditionalInfo.user.username}`)).toBe(true);
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(3, {
            payload: {userId: 1, tweetId: 9},
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(4, {
            payload: `@${mockUserTweetAdditionalInfo.user.username} has been ${snackbarText}.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };

    const createTweetComponentActionsWrapper = (mockState = mockUserTweetState) => {
        const wrapper = mountWithStore(
            <TweetComponentActions
                tweetId={mockFullTweet.id}
                isFullTweet
            />, mockState);

        return {wrapper};
    };
});
