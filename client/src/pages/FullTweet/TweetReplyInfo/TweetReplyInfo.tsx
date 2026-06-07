import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import {ReplyType} from "../../../store/types/common";
import {FollowReplyIcon} from "../../../icons";
import {selectTweetReplyType, selectTweetUserFullName} from "../../../store/ducks/tweet/selectors";
import {useFullTweetStyles} from "../FullTweetStyles";

const TweetReplyInfo = (): ReactElement => {
    const classes = useFullTweetStyles();
    const replyType = useSelector(selectTweetReplyType);
    const tweetUserFullName = useSelector(selectTweetUserFullName);

    return (
        <>
            {(replyType === ReplyType.FOLLOW) && (
                <Paper variant="outlined" className={classes.replyInfoWrapper}>
                    <div className={classes.replyInfo}>
                        <div className={classes.iconWrapper}>
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {FollowReplyIcon}
                                </span>
                            </div>
                        </div>
                        <div className={classes.replyTextInfoWrapper}>
                            <Typography variant={"h6"} component={"div"}>
                                Who can reply?
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                People @{tweetUserFullName} follows can reply
                            </Typography>
                        </div>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default TweetReplyInfo;
