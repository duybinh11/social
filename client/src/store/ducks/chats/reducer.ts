import produce, {Draft} from 'immer';

import {ChatsActions, ChatsActionsType} from './contracts/actionTypes';
import {ChatsState} from './contracts/state';
import {LoadingStatus} from "../../types/common";
import {dedupeChatsById, getChatParticipantByUserId} from "../../../util/chatUtils";

export const initialChatsState: ChatsState = {
    items: [],
    loadingState: LoadingStatus.LOADING,
    activeChatSelection: undefined,
};

export const chatsReducer = produce((draft: Draft<ChatsState>, action: ChatsActions) => {
    switch (action.type) {
        case ChatsActionsType.SET_CHATS:
            draft.items = dedupeChatsById(action.payload);
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.SET_CHAT: {
            const existingChatIndex = draft.items.findIndex((chat) => chat.id === action.payload.id);
            if (existingChatIndex === -1) {
                draft.items = [...draft.items, action.payload];
            } else {
                draft.items[existingChatIndex] = action.payload;
            }
            draft.items = dedupeChatsById(draft.items);

            if (action.userId !== undefined) {
                const targetParticipant = getChatParticipantByUserId(action.payload, action.userId);

                if (targetParticipant) {
                    draft.activeChatSelection = {
                        chatId: action.payload.id,
                        participantId: targetParticipant.id,
                    };
                }
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;
        }

        case ChatsActionsType.CLEAR_ACTIVE_CHAT_SELECTION:
            draft.activeChatSelection = undefined;
            break;

        case ChatsActionsType.LEAVE_FROM_CONVERSATION:
            draft.items = draft.items.filter((chat) => chat.id !== action.payload.chatId);
            draft.loadingState = LoadingStatus.LOADED
            break;

        case ChatsActionsType.RESET_CHATS_STATE:
            draft.items = [];
            draft.activeChatSelection = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ChatsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialChatsState);
