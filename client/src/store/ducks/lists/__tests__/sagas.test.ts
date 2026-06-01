import {AxiosResponse} from "axios";
import {takeEvery} from "redux-saga/effects";

import {
    createListRequest,
    fetchListsRequest,
    fetchSimpleListsRequest,
    fetchUserListsRequest,
    followListRequest,
    listsSaga,
    processUserToListsRequest,
    unfollowListRequest
} from "../sagas";
import {
    createList,
    fetchSimpleLists,
    followList,
    processUserToLists,
    setCreatedList,
    setFollowList,
    setLists,
    setLoadingState,
    setSimpleLists,
    setSimpleListsLoadingState,
    setUnfollowList,
    setUserLists,
    setUserListsLoadingState,
    unfollowList
} from "../actionCreators";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../../util/testHelper";
import {ListsApi} from "../../../../services/api/listsApi";
import {ListResponse, ListUserResponse, SimpleListResponse} from "../../../types/lists";
import {AddLists, AddUserToListsRequest} from "../contracts/state";
import {updateFollowToFullList} from "../../list/actionCreators";
import {updateFollowListDetail} from "../../listDetail/actionCreators";
import {ListsActionType} from "../contracts/actionTypes";
import {LoadingStatus} from "../../../types/common";

describe("listsSaga:", () => {
    const mockListResponse = {data: [{id: 1}, {id: 2}]} as AxiosResponse<ListResponse[]>;
    const mockListUserResponse = {data: [{id: 1}, {id: 2}]} as AxiosResponse<ListUserResponse[]>;
    
    describe("fetchListsRequest:", () => {
        const worker = fetchListsRequest();
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getAllTweetLists);
        testSetResponse(worker, mockListResponse, setLists, mockListResponse.data, "ListResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchUserListsRequest:", () => {
        const worker = fetchUserListsRequest();
        testLoadingStatus(worker, setUserListsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getUserTweetLists);
        testSetResponse(worker, mockListUserResponse, setUserLists, mockListUserResponse.data, "ListUserResponse");
        testLoadingStatus(worker, setUserListsLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchSimpleListsRequest:", () => {
        const mockSimpleListResponse = {data: [{id: 1}, {id: 2}]} as AxiosResponse<SimpleListResponse[]>;
        const worker = fetchSimpleListsRequest(fetchSimpleLists(1));
        testLoadingStatus(worker, setSimpleListsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getListsToAddUser, 1);
        testSetResponse(worker, mockSimpleListResponse, setSimpleLists, mockSimpleListResponse.data, "SimpleListResponse");
        testLoadingStatus(worker, setSimpleListsLoadingState, LoadingStatus.ERROR)
    });

    describe("createListRequest:", () => {
        const mockCreatedListResponse = {data: {id: 1}} as AxiosResponse<ListUserResponse>;
        const mockAddLists = {name: "test", description: "test", isPrivate: true} as AddLists;
        const worker = createListRequest(createList(mockAddLists));
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.createTweetList, mockAddLists);
        testSetResponse(worker, mockCreatedListResponse, setCreatedList, mockCreatedListResponse.data, "ListUserResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR)
    });

    describe("followListRequest:", () => {
        const mockFollowListResponse = {data: {id: 1}} as AxiosResponse<ListUserResponse>;
        const worker = followListRequest(followList(1));
        testCall(worker, ListsApi.followList, 1);
        testSetResponse(worker, mockFollowListResponse, setFollowList, mockFollowListResponse.data, "ListUserResponse");
        testSetResponse(worker, mockFollowListResponse, updateFollowToFullList, true, "true");
        testSetResponse(worker, mockFollowListResponse, updateFollowListDetail, true, "true");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR)
    });

    describe("unfollowListRequest:", () => {
        const mockUnfollowListResponse = {data: {id: 1}} as AxiosResponse<ListUserResponse>;
        const worker = unfollowListRequest(unfollowList(1));
        testCall(worker, ListsApi.followList, 1);
        testSetResponse(worker, mockUnfollowListResponse, setUnfollowList, mockUnfollowListResponse.data, "ListUserResponse");
        testSetResponse(worker, mockUnfollowListResponse, updateFollowToFullList, false, "false");
        testSetResponse(worker, mockUnfollowListResponse, updateFollowListDetail, false, "false");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR)
    });

    describe("processUserToListsRequest:", () => {
        const mockAddUserToListsRequest = {userId: 1} as AddUserToListsRequest;
        const worker = processUserToListsRequest(processUserToLists(mockAddUserToListsRequest));

        testCall(worker, ListsApi.addUserToLists, mockAddUserToListsRequest);
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(listsSaga, [
        {actionType: ListsActionType.FETCH_LISTS, workSaga: fetchListsRequest},
        {actionType: ListsActionType.FETCH_USER_LISTS, workSaga: fetchUserListsRequest},
        {actionType: ListsActionType.FETCH_SIMPLE_LISTS, workSaga: fetchSimpleListsRequest},
        {actionType: ListsActionType.CREATE_LIST, workSaga: createListRequest},
        {actionType: ListsActionType.FOLLOW_LIST, workSaga: followListRequest},
        {actionType: ListsActionType.UNFOLLOW_LIST, workSaga: unfollowListRequest},
        {actionType: ListsActionType.PROCESS_USER_TO_LISTS, workSaga: processUserToListsRequest},
    ], takeEvery);
});
