import React, {ReactElement, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Paper} from "@material-ui/core";

import {fetchLists, fetchUserLists, resetListsState} from "../../store/ducks/lists/actionCreators";
import {useGlobalStyles} from "../../util/globalClasses";
import ListsHeader from "./ListsHeader/ListsHeader";
import DiscoverLists from "./DiscoverLists/DiscoverLists";
import UserLists from "./UserLists/UserLists";

const Lists = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Lists / Twitter";
        dispatch(fetchLists());
        dispatch(fetchUserLists());

        return () => {
            dispatch(resetListsState());
        };
    }, []);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <ListsHeader/>
            <div className={globalClasses.contentWrapper}>
                <DiscoverLists/>
                <UserLists/>
            </div>
        </Paper>
    );
};

export default Lists;
