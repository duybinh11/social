import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Paper} from "@material-ui/core";

import {useListsItemStyles} from "./ListsItemStyles";
import {selectUserDataId} from "../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../util/globalClasses";
import {ListResponse, ListUserResponse} from "../../../store/types/lists";
import {LISTS} from "../../../util/pathConstants";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";
import ListInfoDescription from "./ListInfoDescription/ListInfoDescription";
import ListsItemAvatar from "./ListsItemAvatar/ListsItemAvatar";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    isLastItem?: boolean;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = memo(({list, isLastItem, isMyList}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useListsItemStyles();
    const myProfileId = useSelector(selectUserDataId);

    return (
        <Link to={`${LISTS}/${list?.id}`} className={globalClasses.link}>
            <Paper
                className={classes.container}
                style={isLastItem ? {borderBottom: 0} : undefined}
                variant="outlined"
            >
                <ListsItemAvatar listWallpaper={list?.wallpaper} listAltWallpaper={list?.altWallpaper}/>
                <div className={classes.listInfoContainer}>
                    <ListInfoDescription
                        listId={list?.id}
                        listName={list?.name}
                        listDescription={list?.description}
                        listIsPrivate={"isPrivate" in list! && list?.isPrivate}
                        listOwnerFullName={list?.listOwner.fullName}
                        listOwnerUsername={list?.listOwner.username}
                        listOwnerAvatar={list?.listOwner.avatar}
                    />
                    {(myProfileId === list?.listOwner.id || isMyList) ? null : (
                        <FollowListButton
                            listId={list!.id}
                            isFollower={(list as ListResponse).isFollower}
                        />
                    )}
                </div>
            </Paper>
        </Link>
    );
});

export default ListsItem;
