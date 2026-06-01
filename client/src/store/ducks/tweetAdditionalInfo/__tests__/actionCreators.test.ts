import {testAction} from "../../../../util/testHelper";
import {
    fetchTweetAdditionalInfo,
    resetTweetAdditionalInfo,
    setBlockedTweetAdditionalInfo,
    setFollowedTweetAdditionalInfo,
    setMutedTweetAdditionalInfo,
    setTweetAdditionalInfo,
    setTweetAdditionalInfoLoadingState
} from "../actionCreators";
import {TweetAdditionalInfoType} from "../contracts/actionTypes";
import {mockUserTweetAdditionalInfo} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../types/common";

describe("tweetAdditionalInfo actionCreators:", () => {
    testAction(setTweetAdditionalInfo, setTweetAdditionalInfo(mockUserTweetAdditionalInfo), {
        type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO,
        payload: mockUserTweetAdditionalInfo
    });

    testAction(fetchTweetAdditionalInfo, fetchTweetAdditionalInfo(1), {
        type: TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO,
        payload: 1
    });

    testAction(setMutedTweetAdditionalInfo, setMutedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(setBlockedTweetAdditionalInfo, setBlockedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(setFollowedTweetAdditionalInfo, setFollowedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(resetTweetAdditionalInfo, resetTweetAdditionalInfo(), {
        type: TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE
    });

    testAction(setTweetAdditionalInfoLoadingState, setTweetAdditionalInfoLoadingState(LoadingStatus.LOADED), {
        type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE,
        payload: LoadingStatus.LOADED
    });
});
