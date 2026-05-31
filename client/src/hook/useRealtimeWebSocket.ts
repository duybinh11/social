import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Client, IMessage} from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {store, RootState} from "../store/store";
import {WS_URL} from "../util/endpoints";
import {setChatMessage} from "../store/ducks/chatMessages/actionCreators";
import {setNotification, updateNotificationInfoTweet} from "../store/ducks/notifications/actionCreators";
import {setNewNotification, setUnreadMessage} from "../store/ducks/user/actionCreators";
import {setScheduledTweets, setTweet, setUpdatedTweet} from "../store/ducks/tweets/actionCreators";
import {NotificationResponse} from "../store/types/notification";
import {TweetResponse} from "../store/types/tweet";
import {ChatMessageResponse} from "../store/types/chat";

const parseBody = <T>(message: IMessage): T => JSON.parse(message.body);

const isNotificationInStore = (state: RootState, notificationId: number): boolean =>
    state.notifications.notificationsList.some((notification) => notification.id === notificationId);

export const useRealtimeWebSocket = (myProfileId?: number): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(WS_URL),
            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            onConnect: () => {
                client.subscribe("/topic/feed", (message) => {
                    const payload = parseBody<NotificationResponse>(message);
                    dispatch(setUpdatedTweet(payload));
                    dispatch(updateNotificationInfoTweet(payload));
                });

                client.subscribe("/topic/feed/add", (message) => {
                    dispatch(setTweet(parseBody<TweetResponse>(message)));
                });

                client.subscribe("/topic/feed/schedule", (message) => {
                    dispatch(setScheduledTweets(parseBody<TweetResponse[]>(message)));
                });

                if (myProfileId) {
                    client.subscribe(`/topic/chat/${myProfileId}`, (message) => {
                        const chatMessage = parseBody<ChatMessageResponse>(message);
                        dispatch(setChatMessage(chatMessage));

                        if (myProfileId !== chatMessage.author.id) {
                            dispatch(setUnreadMessage(chatMessage));
                        }
                    });

                    client.subscribe(`/topic/notifications/${myProfileId}`, (message) => {
                        const notification = parseBody<NotificationResponse>(message);

                        if (!notification.id) {
                            return;
                        }

                        const state = store.getState();

                        if (!isNotificationInStore(state, notification.id)) {
                            dispatch(setNotification(notification));
                            dispatch(setNewNotification());
                        }
                    });

                }
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [dispatch, myProfileId]);
};
