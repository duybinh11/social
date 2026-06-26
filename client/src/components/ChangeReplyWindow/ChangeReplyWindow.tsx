import React, {FC, memo, ReactElement} from 'react';
import {List, ListItem, Typography} from "@material-ui/core";

import {useChangeReplyWindowStyles} from "./ChangeReplyWindowStyles";
import {CheckIcon, EveryoneReplyOutlinedIcon, FollowReplyOutlinedIcon} from "../../icons";
import {ReplyType} from "../../store/types/common";

interface ChangeReplyWindowProps {
    replyType: ReplyType;
    onChangeTweetReplyType: (replyType: ReplyType) => void;
}

const ChangeReplyWindow: FC<ChangeReplyWindowProps> = memo(({replyType, onChangeTweetReplyType}): ReactElement => {
    const classes = useChangeReplyWindowStyles();

    return (
        <div className={classes.dropdown}>
            <div className={classes.infoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Ai có thể trả lời?
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Chọn ai có thể trả lời bài viết này.
                </Typography>
            </div>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.EVERYONE)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {EveryoneReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        Mọi người
                    </Typography>
                    {(replyType === ReplyType.EVERYONE) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
                <ListItem
                    id={"lastItem"}
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.FOLLOW)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {FollowReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        Người bạn theo dõi
                    </Typography>
                    {(replyType === ReplyType.FOLLOW) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
            </List>
        </div>
    );
});

export default ChangeReplyWindow;
