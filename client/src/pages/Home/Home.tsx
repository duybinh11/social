import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import {useHomeStyles} from './HomeStyles';
import AddTweetForm from '../../components/AddTweetForm/AddTweetForm';
import {
    fetchFollowersTweets,
    fetchTweets,
    resetTweets,
} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {selectUserDataIsProfileStarted, selectUserIsLoaded} from "../../store/ducks/user/selectors";
import Welcome from "../../components/Welcome/Welcome";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import TopTweetActions from "./TopTweetActions/TopTweetActions";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import {SEARCH} from "../../util/pathConstants";

const Home: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const isProfileStarted = useSelector(selectUserDataIsProfileStarted);
    const isUserLoaded = useSelector(selectUserIsLoaded);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0);
    const initialTweetsLoaded = React.useRef(false);

    useEffect(() => {
        document.body.style.overflow = "unset";
        window.scrollTo(0, 0);

        return () => {
            initialTweetsLoaded.current = false;
            dispatch(resetTweets());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isUserLoaded && location.pathname !== SEARCH && !initialTweetsLoaded.current) {
            initialTweetsLoaded.current = true;
            dispatch(fetchTweets(0));
            setPage(1);
        }
    }, [dispatch, isUserLoaded, location.pathname]);

    const loadTweets = (): void => {
        if (switchTweets) {
            dispatch(fetchFollowersTweets(page));
        } else {
            dispatch(fetchTweets(page));
        }
        setPage(prevState => prevState + 1);
    };

    const handleLatestTweets = (): void => {
        dispatch(resetTweets());
        setSwitchTweets(true);
        setPage(1);
        dispatch(fetchFollowersTweets(0));
    };

    const handleTopTweets = (): void => {
        dispatch(resetTweets());
        setSwitchTweets(false);
        setPage(1);
        dispatch(fetchTweets(0));
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <Typography variant="h5">
                        Home
                    </Typography>
                    <TopTweetActions
                        switchTweets={switchTweets}
                        handleLatestTweets={handleLatestTweets}
                        handleTopTweets={handleTopTweets}
                    />
                </Paper>
                <div className={classes.addForm}>
                    <AddTweetForm title={"What's happening?"} buttonName={"Tweet"}/>
                </div>
                <Divider/>
                {!isProfileStarted ? (
                    <Welcome/>
                ) : (
                    <>
                        {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet}/>)}
                        {isLoading && <Spinner/>}
                    </>
                )}
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Home)("Home");
