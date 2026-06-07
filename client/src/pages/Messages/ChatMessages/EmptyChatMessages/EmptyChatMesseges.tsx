import React, {memo, ReactElement} from "react";
import {Button, Typography} from "@material-ui/core";

import {useEmptyChatMessagesStyles} from "./EmptyChatMessagesStyles";

interface EmptyChatMessagesProps {
    onNewMessageClick?: () => void;
}

const EmptyChatMessages = memo(({onNewMessageClick}: EmptyChatMessagesProps): ReactElement => {
    const classes = useEmptyChatMessagesStyles();

    return (
        <div className={classes.chatInfoWrapper}>
            <Typography variant="h5" component="div" className={classes.title}>
                Chọn tin nhắn
            </Typography>
            <Typography variant="body1" component="div" className={classes.subtitle}>
                Chọn một cuộc trò chuyện từ danh sách bên trái hoặc bắt đầu cuộc trò chuyện mới.
            </Typography>
            <Button
                onClick={onNewMessageClick}
                className={classes.chatInfoButton}
                variant="contained"
                color="primary"
                size="large"
            >
                Tin nhắn mới
            </Button>
        </div>
    );
});

export default EmptyChatMessages;
