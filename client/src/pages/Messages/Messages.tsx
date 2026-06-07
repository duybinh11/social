import React, {FC, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Grid, List, Paper, Typography} from "@material-ui/core";

import {useMessagesStyles} from "./MessagesStyles";
import {fetchChats, resetChatsState, clearActiveChatSelection} from "../../store/ducks/chats/actionCreators";
import {selectUserDataId} from "../../store/ducks/user/selectors";
import {selectActiveChatSelection, selectChatsItems, selectIsChatsLoading} from "../../store/ducks/chats/selectors";
import {resetChatMessages} from "../../store/ducks/chatMessages/actionCreators";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import {ChatResponse} from "../../store/types/chat";
import ChatMessages from "./ChatMessages/ChatMessages";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import {MESSAGES, MESSAGES_SETTINGS} from "../../util/pathConstants";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import StartConversation from "./StartConversation/StartConversation";
import ChatParticipant from "./ChatParticipant/ChatParticipant";
import MessageSettings from "./MessageSettings/MessageSettings";
import SearchChatParticipant from "./SearchChatParticipant/SearchChatParticipant";
import {resetChatState} from "../../store/ducks/chat/actionCreators";
import MessagesModal from "./MessagesModal/MessagesModal";
import {useMessagesModal} from "./MessagesModal/useMessagesModal";
import {resetUserProfileState} from "../../store/ducks/userProfile/actionCreators";
import {getOtherChatParticipant} from "../../util/chatUtils";

const Messages: FC = (): ReactElement => {
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ removeParticipant: boolean | undefined; }>();
    const myProfileId = useSelector(selectUserDataId);
    const chats = useSelector(selectChatsItems);
    const isChatsLoading = useSelector(selectIsChatsLoading);
    const activeChatSelection = useSelector(selectActiveChatSelection);
    const [participantId, setParticipantId] = useState<number | undefined>(undefined);
    const [chatId, setChatId] = useState<number | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>("");
    const {visibleModalWindow, onOpenModalWindow, onCloseModalWindow} = useMessagesModal();

    useEffect(() => {
        dispatch(fetchChats());

        return () => {
            dispatch(resetChatsState());
            dispatch(resetChatState());
        };
    }, []);

    useEffect(() => {
        if (location.state?.removeParticipant === true) {
            setParticipantId(undefined);
            setChatId(undefined);
            dispatch(resetChatMessages());
            dispatch(resetChatState());
        }
    }, [location.state?.removeParticipant]);

    useEffect(() => {
        if (!activeChatSelection) {
            return;
        }

        setParticipantId(activeChatSelection.participantId);
        setChatId(activeChatSelection.chatId);
        dispatch(resetUserProfileState());
        dispatch(clearActiveChatSelection());
    }, [activeChatSelection, dispatch]);

    const filteredChats = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        if (!query) {
            return chats;
        }

        return chats.filter((chat) => {
            const otherParticipant = getOtherChatParticipant(chat, myProfileId)?.user;
            if (!otherParticipant) {
                return false;
            }

            return (
                otherParticipant.fullName?.toLowerCase().includes(query)
                || otherParticipant.username?.toLowerCase().includes(query)
            );
        });
    }, [chats, myProfileId, searchText]);

    const handleListItemClick = useCallback((chat: ChatResponse): void => {
        const otherParticipant = getOtherChatParticipant(chat, myProfileId);
        setParticipantId(otherParticipant?.id);
        setChatId(chat.id);
        dispatch(resetUserProfileState());
    }, [myProfileId, dispatch]);

    return (
        <Grid container spacing={0} className={classes.container}>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow}/>
            <Grid item className={classes.leftPanel}>
                <Paper className={classes.leftPaper} variant="outlined">
                    <MessagesHeader onNewMessageClick={onOpenModalWindow}/>
                    <div className={classes.leftContent}>
                        {isChatsLoading ? (
                            <Spinner paddingTop={150}/>
                        ) : (
                            (chats.length === 0) ? (
                                <div className={classes.emptyState}>
                                    <StartConversation onStartConversation={onOpenModalWindow}/>
                                </div>
                            ) : (
                                <>
                                    <div className={classes.searchWrapper}>
                                        <SearchChatParticipant
                                            value={searchText}
                                            onChange={setSearchText}
                                            onNewMessageClick={onOpenModalWindow}
                                        />
                                    </div>
                                    {filteredChats.length === 0 ? (
                                        <Typography variant="body2" className={classes.emptySearch}>
                                            Không tìm thấy cuộc trò chuyện phù hợp.
                                        </Typography>
                                    ) : (
                                        <List component="nav" className={classes.list}>
                                            {filteredChats.map((chat) => (
                                                <ChatParticipant
                                                    key={chat.id}
                                                    chat={chat}
                                                    selectedChatId={chatId}
                                                    handleListItemClick={handleListItemClick}
                                                />
                                            ))}
                                        </List>
                                    )}
                                </>
                            )
                        )}
                    </div>
                </Paper>
            </Grid>
            <Grid item className={classes.rightPanel}>
                <Route exact path={MESSAGES_SETTINGS}>
                    <MessageSettings/>
                </Route>
                <Route exact path={`${MESSAGES}/:id/info`}>
                    <ConversationInfo participantId={participantId} chatId={chatId}/>
                </Route>
                <Route exact path={MESSAGES}>
                    <ChatMessages
                        participantId={participantId}
                        chatId={chatId}
                        onNewMessageClick={onOpenModalWindow}
                    />
                </Route>
            </Grid>
        </Grid>
    );
};

export default withDocumentTitle(Messages)("Tin nhắn");
