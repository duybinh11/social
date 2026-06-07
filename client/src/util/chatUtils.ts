import {ChatResponse, ParticipantResponse} from "../store/types/chat";

export const isSameUserId = (firstId?: number | null, secondId?: number | null): boolean => {
    if (firstId == null || secondId == null) {
        return false;
    }

    return Number(firstId) === Number(secondId);
};

export const getOtherChatParticipant = (
    chat: ChatResponse,
    myProfileId?: number
): ParticipantResponse | undefined => {
    if (!myProfileId) {
        return undefined;
    }

    return chat.participants.find((participant) => !isSameUserId(participant.user.id, myProfileId));
};

export const getChatParticipantByUserId = (
    chat: ChatResponse,
    userId: number
): ParticipantResponse | undefined => {
    return chat.participants.find((participant) => isSameUserId(participant.user.id, userId));
};

export const dedupeChatsById = (chats: ChatResponse[]): ChatResponse[] => {
    const chatsById = new Map<number, ChatResponse>();

    chats.forEach((chat) => {
        chatsById.set(chat.id, chat);
    });

    return Array.from(chatsById.values());
};
