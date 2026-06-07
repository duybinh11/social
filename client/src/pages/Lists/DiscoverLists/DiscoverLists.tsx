import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";

import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import {useDiscoverListsStyles} from "./DiscoverListsStyles";
import {useGlobalStyles} from "../../../util/globalClasses";
import {selectIsListsLoading, selectListsItems} from "../../../store/ducks/lists/selectors";

const DiscoverLists = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useDiscoverListsStyles();
    const lists = useSelector(selectListsItems);
    const isListsLoading = useSelector(selectIsListsLoading);

    return (
        <Paper id={"list"} className={classes.newLists} variant="outlined">
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                Discover new Lists
            </Typography>
            {isListsLoading ? (
                <div style={{padding: "59px 0px"}}>
                    <Spinner/>
                </div>
            ) : (
                lists.map((list, index) => (
                    <ListsItem
                        key={list.id}
                        list={list}
                        isLastItem={index === lists.length - 1}
                    />
                ))
            )}
        </Paper>
    );
};

export default DiscoverLists;
