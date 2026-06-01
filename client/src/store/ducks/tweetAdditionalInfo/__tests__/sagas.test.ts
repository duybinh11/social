import {AxiosResponse} from "axios";

import {
    fetchTweetAdditionalInfo,
    setTweetAdditionalInfo,
    setTweetAdditionalInfoLoadingState
} from "../actionCreators";
import {fetchTweetAdditionalInfoRequest} from "../saga";
import {TweetAdditionalInfoResponse} from "../../../types/tweet";
import {TweetApi} from "../../../../services/api/tweetApi";
import {mockUserTweetAdditionalInfo} from "../../../../util/mockData/mockData";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../../util/testHelper";
import {TweetAdditionalInfoType} from "../contracts/actionTypes";
import {LoadingStatus} from "../../../types/common";
import {takeLatest} from "redux-saga/effects";
import {tweetAdditionalInfoSaga} from "../saga";

describe("tweetAdditionalInfoSaga:", () => {
    const mockResponse = {data: mockUserTweetAdditionalInfo} as AxiosResponse<TweetAdditionalInfoResponse>;

    describe("fetchTweetAdditionalInfoRequest:", () => {
        const worker = fetchTweetAdditionalInfoRequest(fetchTweetAdditionalInfo(1));
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTweetAdditionalInfoById, 1);
        testSetResponse(worker, mockResponse, setTweetAdditionalInfo, mockResponse.data, "TweetAdditionalInfoResponse");
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tweetAdditionalInfoSaga, [
        {actionType: TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO, workSaga: fetchTweetAdditionalInfoRequest},
    ], takeLatest);
});
