import {
    ChatsActionsType,
    ClearActiveChatSelectionActionInterface,
    CreateChatActionInterface,
    FetchChatsActionInterface,
    LeaveFromConversationActionInterface,
    ResetChatsStateActionInterface,
    SetChatActionInterface,
    SetChatsActionInterface,
    SetChatsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {ChatResponse} from "../../types/chat";
import {ChatsState, LeaveConversationRequest} from "./contracts/state";
import {LoadingStatus} from "../../types/common";

export const setChats = (payload: ChatsState["items"]): SetChatsActionInterface => ({
    type: ChatsActionsType.SET_CHATS,
    payload,
});

export const setChat = (payload: ChatResponse, userId?: number): SetChatActionInterface => ({
    type: ChatsActionsType.SET_CHAT,
    payload,
    userId,
});

export const clearActiveChatSelection = (): ClearActiveChatSelectionActionInterface => ({
    type: ChatsActionsType.CLEAR_ACTIVE_CHAT_SELECTION,
});

export const fetchChats = (): FetchChatsActionInterface => ({
    type: ChatsActionsType.FETCH_CHATS,
});

export const createChat = (payload: number): CreateChatActionInterface => ({
    type: ChatsActionsType.CREATE_CHAT,
    payload,
});

export const leaveFromConversation = (payload: LeaveConversationRequest): LeaveFromConversationActionInterface => ({
    type: ChatsActionsType.LEAVE_FROM_CONVERSATION,
    payload,
});

export const resetChatsState = (): ResetChatsStateActionInterface => ({
    type: ChatsActionsType.RESET_CHATS_STATE
});

export const setChatsLoadingState = (payload: LoadingStatus): SetChatsLoadingStateActionInterface => ({
    type: ChatsActionsType.SET_LOADING_STATE,
    payload,
});
