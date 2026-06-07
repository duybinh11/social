import {ChatResponse} from "../../../types/chat";
import {LoadingStatus} from "../../../types/common";

export interface ActiveChatSelection {
    chatId: number;
    participantId: number;
}

export interface ChatsState {
    items: ChatResponse[];
    loadingState: LoadingStatus;
    activeChatSelection?: ActiveChatSelection;
}

export interface LeaveConversationRequest {
    participantId: number;
    chatId: number;
}
