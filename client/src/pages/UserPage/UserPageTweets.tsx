import React, {FC, memo, ReactElement, useState} from "react";
import {useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {Button, Typography} from "@material-ui/core";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import {useUserPageStyles} from "./UserPageStyles";
import AddTweetModal from "../../components/AddTweetModal/AddTweetModal";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../store/ducks/userTweets/selectors";
import {selectUserDataId} from "../../store/ducks/user/selectors";
import {selectUserProfileId, selectUserProfileUsername} from "../../store/ducks/userProfile/selectors";

interface UserPageTweetsProps {
    activeTab: number;
    page: number;
    loadUserTweets: () => void;
}

const UserPageTweets: FC<UserPageTweetsProps> = memo(({activeTab, page, loadUserTweets}): ReactElement => {
    const classes = useUserPageStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [visibleAddTweet, setSetVisibleAddTweet] = useState<boolean>(false);

    const handleClickOpenAddTweet = (): void => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = (): void => {
        setSetVisibleAddTweet(false);
    };

    const renderTweets = () => {
        if (tweets?.length === 0 && activeTab === 0 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "Bạn chưa có tweet nào"
                        ) : (
                            `@${username} chưa có tweet nào`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? (
                            "Khi bạn đăng tweet, chúng sẽ hiện ở đây."
                        ) : (
                            "Khi họ đăng tweet, chúng sẽ hiện ở đây."
                        )}
                    </Typography>
                    {(userProfileId === myProfileId) && (
                        <Button
                            className={classes.button}
                            onClick={handleClickOpenAddTweet}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Đăng tweet
                        </Button>
                    )}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 1 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "Bạn chưa có trả lời nào"
                        ) : (
                            `@${username} chưa có trả lời nào`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "Khi bạn trả lời tweet, chúng sẽ hiện ở đây."
                        ) : (
                            "Khi họ trả lời tweet, chúng sẽ hiện ở đây."
                        )}
                    </Typography>
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 2 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "Bạn chưa đăng ảnh nào"
                        ) : (
                            `@${username} chưa đăng ảnh nào`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "Khi bạn đăng tweet có ảnh, chúng sẽ hiện ở đây."
                        ) : (
                            "Khi họ đăng ảnh, chúng sẽ hiện ở đây."
                        )}
                    </Typography>
                    {(userProfileId === myProfileId) && (
                        <Button
                            className={classes.button}
                            onClick={handleClickOpenAddTweet}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Đăng ảnh
                        </Button>
                    )}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 3 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "Bạn chưa thích tweet nào"
                        ) : (
                            `@${username} chưa thích tweet nào`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "Nhấn trái tim trên bất kỳ tweet nào để thể hiện sự yêu thích. Khi bạn làm vậy, chúng sẽ hiện ở đây."
                        ) : (
                            "Khi họ thích tweet, chúng sẽ hiện ở đây."
                        )}
                    </Typography>
                </div>
            )
        } else {
            return (
                <>
                    {tweets?.map((tweet) => (
                        <TweetComponent key={tweet.id} tweet={tweet} activeTab={activeTab}/>
                    ))}
                    {isTweetsLoading && <Spinner/>}
                </>
            );
        }
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadUserTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            {renderTweets()}
            <AddTweetModal onClose={onCloseAddTweet} visible={visibleAddTweet}/>
        </InfiniteScroll>
    );
});

export default UserPageTweets;
