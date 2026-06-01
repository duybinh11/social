import produce, {Draft} from "immer";

import {TweetAdditionalInfoState} from "./contracts/state";
import {TweetAdditionalInfoActions, TweetAdditionalInfoType} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types/common";

export const initialTweetAdditionalInfoState: TweetAdditionalInfoState = {
    tweetAdditionalInfo: undefined,
    loadingState: LoadingStatus.LOADING,
};

export const tweetAdditionalInfoReducer = produce((draft: Draft<TweetAdditionalInfoState>, action: TweetAdditionalInfoActions) => {
    switch (action.type) {
        case TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO:
            draft.tweetAdditionalInfo = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO:
            if (draft.tweetAdditionalInfo) {
                draft.tweetAdditionalInfo.user.isUserMuted = action.payload;
            }
            break;

        case TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO:
            if (draft.tweetAdditionalInfo) {
                draft.tweetAdditionalInfo.user.isUserBlocked = action.payload;
            }
            break;

        case TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO:
            if (draft.tweetAdditionalInfo) {
                draft.tweetAdditionalInfo.user.isFollower = action.payload;
            }
            break;

        case TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE:
            draft.tweetAdditionalInfo = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetAdditionalInfoState);
