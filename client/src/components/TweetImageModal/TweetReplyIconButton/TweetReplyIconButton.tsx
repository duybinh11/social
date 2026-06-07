import React, {memo, ReactElement, useState} from "react";
import {useSelector} from "react-redux";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {ReplyIcon} from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import {
    selectTweetDateTime,
    selectTweetId,
    selectTweetImages,
    selectTweetText,
    selectTweetUser
} from "../../../store/ducks/tweet/selectors";
import {useTweetReplyIconButtonStyles} from "./TweetReplyIconButtonStyles";

const TweetReplyIconButton = memo((): ReactElement => {
    const user = useSelector(selectTweetUser);
    const tweetId = useSelector(selectTweetId);
    const text = useSelector(selectTweetText);
    const images = useSelector(selectTweetImages);
    const dateTime = useSelector(selectTweetDateTime);
    const classes = useTweetReplyIconButtonStyles({isUserCanReply: false});
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    return (
        <div className={classes.tweetIcon}>
            <ActionIconButton
                actionText={"Trả lời"}
                icon={ReplyIcon}
                onClick={onOpenReplyModalWindow}
                disabled={false}
            />
            <ReplyModal
                user={user!}
                tweetId={tweetId!}
                text={text!}
                image={images?.[0]}
                dateTime={dateTime!}
                visible={visibleReplyModalWindow}
                onClose={onCloseReplyModalWindow}
            />
        </div>
    );
});

export default TweetReplyIconButton;
