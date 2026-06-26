import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";

import TweetActionResult, {TweetActionResults} from "../../../components/TweetActionResult/TweetActionResult";
import {selectIsTweetRetweeted, selectTweetId} from "../../../store/ducks/tweet/selectors";
import {selectUserPinnedTweetId} from "../../../store/ducks/user/selectors";

const TweetActions = memo((): ReactElement => {
    const tweetId = useSelector(selectTweetId);
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);

    return (
        <>
            {isTweetRetweeted && (
                <TweetActionResult action={TweetActionResults.RETWEET} text={"Bạn đã đăng lại"}/>
            )}
            {(pinnedTweetId === tweetId) && (
                <TweetActionResult action={TweetActionResults.PIN} text={"Bài viết đã ghim"}/>
            )}
        </>
    );
});

export default TweetActions;
