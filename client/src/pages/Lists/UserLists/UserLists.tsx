import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";

import {useUserListsStyles} from "./UserListsStyles";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import {useGlobalStyles} from "../../../util/globalClasses";
import {selectIsUserListsLoading, selectUserListsItems} from "../../../store/ducks/lists/selectors";

const UserLists = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserListsStyles();
    const userLists = useSelector(selectUserListsItems);
    const isUserListsLoading = useSelector(selectIsUserListsLoading);

    return (
        <Paper id={"userLists"} className={classes.myLists} variant="outlined">
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                Danh sách của tôi
            </Typography>
            {isUserListsLoading ? (
                <Spinner/>
            ) : userLists.length === 0 ? (
                <Typography variant="body1" className={classes.emptyState}>
                    Bạn chưa tạo danh sách nào. Nhấn biểu tượng + ở trên để tạo danh sách mới.
                </Typography>
            ) : (
                userLists.map((list, index) => (
                    <ListsItem
                        key={list.id}
                        list={list}
                        isMyList
                        isLastItem={index === userLists.length - 1}
                    />
                ))
            )}
        </Paper>
    );
};

export default UserLists;
