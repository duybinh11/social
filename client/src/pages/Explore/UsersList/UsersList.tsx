import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {List, Typography} from "@material-ui/core";

import UsersItem, {UserItemSize} from "../../../components/UsersItem/UsersItem";
import Spinner from "../../../components/Spinner/Spinner";
import {
    selectUsersSearch,
    selectUsersSearchIsLoaded,
    selectUsersSearchIsLoading
} from "../../../store/ducks/usersSearch/selectors";

interface UsersListProps {
    searchQuery?: string;
}

const UsersList = ({searchQuery}: UsersListProps): ReactElement => {
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const isUsersLoaded = useSelector(selectUsersSearchIsLoaded);
    const users = useSelector(selectUsersSearch);

    return (
        <>
            <List>
                {users?.map((user) => (
                    <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM}/>
                ))}
            </List>
            {isUsersLoading && <Spinner/>}
            {isUsersLoaded && searchQuery && users.length === 0 && (
                <Typography variant="body2" color="textSecondary" style={{padding: 16, textAlign: "center"}}>
                    Không tìm thấy người dùng. Thử tìm theo tên hoặc @username (không cần dấu @).
                </Typography>
            )}
        </>
    );
};

export default UsersList;
