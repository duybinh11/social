import React, {memo, ReactElement} from "react";
import {Button, Typography} from "@material-ui/core";

import {useStartConversationStyles} from "./StartConversationStyles";

interface StartConversationProps {
    onStartConversation?: () => void;
}

const StartConversation = memo(({onStartConversation}: StartConversationProps): ReactElement => {
    const classes = useStartConversationStyles();

    return (
        <>
            <Typography variant={"h5"} component={"div"} className={classes.messagesTitle}>
                Gửi tin nhắn, nhận tin nhắn
            </Typography>
            <Typography variant={"body1"} component={"div"} className={classes.messagesText}>
                Tin nhắn trực tiếp là cuộc trò chuyện riêng tư giữa bạn và người khác trên Twitter.
                Chia sẻ tweet, phương tiện và nhiều hơn nữa!
            </Typography>
            <Button
                onClick={onStartConversation}
                className={classes.messagesButton}
                variant="contained"
                color="primary"
                size="large"
            >
                Bắt đầu trò chuyện
            </Button>
        </>
    );
});

export default StartConversation;
