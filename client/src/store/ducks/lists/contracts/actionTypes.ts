import {Action} from "redux";

import {AddLists, AddUserToListsRequest, ListsState, UpdateListsPayload} from "./state";
import {ListUserResponse} from "../../../types/lists";
import {LoadingStatus} from "../../../types/common";

export enum ListsActionType {
    SET_LISTS = "lists/SET_LISTS",
    SET_USER_LISTS = "lists/SET_USER_LISTS",
    SET_SIMPLE_LISTS = "lists/SET_SIMPLE_LISTS",
    SET_LIST = "lists/SET_LIST",
    SET_UPDATED_LISTS = "lists/SET_UPDATED_LISTS",
    FOLLOW_LIST = "lists/FOLLOW_LIST",
    UNFOLLOW_LIST = "lists/UNFOLLOW_LIST",
    PROCESS_USER_TO_LISTS = "lists/PROCESS_USER_TO_LISTS",
    SET_FOLLOW_LIST = "lists/SET_FOLLOW_LIST",
    SET_UNFOLLOW_LIST = "lists/SET_UNFOLLOW_LIST",
    CREATE_LIST = "lists/CREATE_LIST",
    FETCH_LISTS = "lists/FETCH_LISTS",
    FETCH_USER_LISTS = "lists/FETCH_USER_LISTS",
    FETCH_SIMPLE_LISTS = "lists/FETCH_SIMPLE_LISTS",
    RESET_LISTS_STATE = "lists/RESET_LISTS_STATE",
    SET_LOADING_STATE = "lists/SET_LOADING_STATE",
    SET_LISTS_LOADING_STATE = "lists/SET_LISTS_LOADING_STATE",
    SET_USER_LISTS_LOADING_STATE = "lists/SET_USER_LISTS_LOADING_STATE",
    SET_SIMPLE_LISTS_LOADING_STATE = "lists/SET_SIMPLE_LISTS_LOADING_STATE",
}

export interface SetListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LISTS;
    payload: ListsState["lists"];
}

export interface SetUserListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_USER_LISTS;
    payload: ListsState["userLists"];
}

export interface SetSimpleListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_SIMPLE_LISTS;
    payload: ListsState["simpleLists"];
}

export interface SetListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LIST;
    payload: ListUserResponse;
}

export interface SetUpdatedListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UPDATED_LISTS;
    payload: UpdateListsPayload;
}

export interface FollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FOLLOW_LIST;
    payload: number;
}

export interface UnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.UNFOLLOW_LIST;
    payload: number;
}

export interface ProcessUserToListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.PROCESS_USER_TO_LISTS;
    payload: AddUserToListsRequest;
}

export interface SetFollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_FOLLOW_LIST;
    payload: ListUserResponse;
}

export interface SetUnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UNFOLLOW_LIST;
    payload: ListUserResponse;
}

export interface CreateListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.CREATE_LIST;
    payload: AddLists;
}

export interface FetchListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_LISTS;
}

export interface FetchUserListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_USER_LISTS;
}

export interface FetchSimpleListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_SIMPLE_LISTS;
    payload: number;
}

export interface ResetListsStateActionInterface extends Action<ListsActionType> {
    type: ListsActionType.RESET_LISTS_STATE;
}

export interface SetLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetUserListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_USER_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetSimpleListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListsActions =
    | SetListsActionInterface
    | SetUserListsActionInterface
    | SetUpdatedListActionInterface
    | SetFollowListActionInterface
    | SetUnfollowListActionInterface
    | SetListActionInterface
    | SetSimpleListsActionInterface
    | ResetListsStateActionInterface
    | SetLoadingStateInterface
    | SetListsLoadingStateInterface
    | SetUserListsLoadingStateInterface
    | SetSimpleListsLoadingStateInterface
