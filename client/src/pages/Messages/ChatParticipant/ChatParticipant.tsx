import React, {FC, memo, ReactElement} from "react";
import {useSelector} from "react-redux";

import {useChatParticipantStyles} from "./ChatParticipantStyles";
import {Avatar, ListItem, Typography} from "@material-ui/core";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {ChatResponse} from "../../../store/types/chat";
import {selectUserDataId} from "../../../store/ducks/user/selectors";
import {getOtherChatParticipant} from "../../../util/chatUtils";

interface ChatParticipantProps {
    chat: ChatResponse;
    selectedChatId?: number;
    handleListItemClick: (chat: ChatResponse) => void;
}

const ChatParticipant: FC<ChatParticipantProps> = memo((
    {
        chat,
        selectedChatId,
        handleListItemClick
    }
): ReactElement => {
    const classes = useChatParticipantStyles();
    const myProfileId = useSelector(selectUserDataId);
    const otherParticipant = getOtherChatParticipant(chat, myProfileId)?.user;
    const avatar = otherParticipant?.avatar?.src ?? DEFAULT_PROFILE_IMG;

    return (
        <ListItem
            className={classes.listItem}
            id={selectedChatId === chat.id ? "selected" : ""}
            selected={selectedChatId === chat.id}
            onClick={() => handleListItemClick(chat)}
            button
        >
            <div className={classes.userWrapper}>
                <Avatar className={classes.userAvatar} src={avatar}/>
                <div className={classes.userInfo}>
                    <Typography variant="body1" component="span" className={classes.userName}>
                        {otherParticipant?.fullName}
                    </Typography>
                    <Typography variant="body2" component="span" className={classes.username}>
                        @{otherParticipant?.username}
                    </Typography>
                </div>
            </div>
        </ListItem>
    );
});

export default ChatParticipant;
