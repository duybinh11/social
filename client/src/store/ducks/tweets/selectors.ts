import {RootState} from "../../store";
import {TweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types/common";
import {TweetResponse} from "../../types/tweet";

const isVisibleTweet = (tweet: TweetResponse): boolean => !tweet.user?.isUserMuted;

export const selectTweetsState = (state: RootState): TweetsState => state.tweets;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetsState(state).loadingState;
export const selectIsTweetsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;
export const selectVisibleTweetsItems = (state: RootState) => selectTweetsItems(state).filter(isVisibleTweet);
export const selectTweetsItemsSize = (state: RootState) => selectVisibleTweetsItems(state).length;
export const selectPagesCount = (state: RootState) => selectTweetsState(state).pagesCount;
