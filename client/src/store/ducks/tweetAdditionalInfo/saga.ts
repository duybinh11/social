import {AxiosResponse} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";

import {
    setTweetAdditionalInfo,
    setTweetAdditionalInfoLoadingState
} from "./actionCreators";
import {
    FetchTweetAdditionalInfoActionInterface,
    TweetAdditionalInfoType
} from "./contracts/actionTypes";
import {TweetAdditionalInfoResponse} from "../../types/tweet";
import {TweetApi} from "../../../services/api/tweetApi";
import {LoadingStatus} from "../../types/common";

export function* fetchTweetAdditionalInfoRequest({payload}: FetchTweetAdditionalInfoActionInterface) {
    try {
        yield put(setTweetAdditionalInfoLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetAdditionalInfoResponse> = yield call(TweetApi.getTweetAdditionalInfoById, payload);
        yield put(setTweetAdditionalInfo(response.data));
    } catch (error) {
        yield put(setTweetAdditionalInfoLoadingState(LoadingStatus.ERROR));
    }
}

export function* tweetAdditionalInfoSaga() {
    yield takeLatest(TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO, fetchTweetAdditionalInfoRequest);
}
