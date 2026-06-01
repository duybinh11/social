import React, {FC, FormEvent, ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, Divider, InputAdornment, List, ListItem, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {useMessagesModalStyles} from "./MessagesModalStyles";
import {MessagesModalInput} from "./MessagesModalInput/MessagesModalInput"
import {
    fetchUsersSearchByUsername,
    setUsersSearch
} from "../../../store/ducks/usersSearch/actionCreators";
import {selectUsersPagesCount, selectUsersSearch} from "../../../store/ducks/usersSearch/selectors";
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import {createChat} from "../../../store/ducks/chats/actionCreators";
import {SearchIcon} from "../../../icons";
import CloseButton from "../../../components/CloseButton/CloseButton";
import {selectUserDataId} from "../../../store/ducks/user/selectors";
import {UserResponse} from "../../../store/types/user";
import InfiniteScrollWrapper from '../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper';
import {normalizeUserSearchQuery} from "../../../util/normalizeUserSearchQuery";
import {selectUsersSearchIsLoading} from "../../../store/ducks/usersSearch/selectors";
import Spinner from "../../../components/Spinner/Spinner";

const SEARCH_DEBOUNCE_MS = 300;

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}

const MessagesModal: FC<MessagesModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useMessagesModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const myProfileId = useSelector(selectUserDataId);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const isUsersSearchLoading = useSelector(selectUsersSearchIsLoading);
    const [text, setText] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedUser, setSelectedUser] = useState<UserResponse>();

    useEffect(() => {
        if (!visible) {
            return;
        }
        setText("");
        setSelectedIndex(undefined);
        setSelectedUser(undefined);
        dispatch(setUsersSearch([]));
    }, [visible, dispatch]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        const query = normalizeUserSearchQuery(text);
        if (!query) {
            dispatch(setUsersSearch([]));
            return;
        }

        const timer = setTimeout(() => {
            dispatch(fetchUsersSearchByUsername({
                username: query,
                pageNumber: 0
            }));
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [text, visible, dispatch]);

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const query = normalizeUserSearchQuery(text);
        if (query) {
            dispatch(fetchUsersSearchByUsername({
                username: query,
                pageNumber: 0
            }));
        }
    };

    const loadParticipants = (page: number): void => {
        const query = normalizeUserSearchQuery(text);
        if (!query) {
            return;
        }
        dispatch(fetchUsersSearchByUsername({
            username: query,
            pageNumber: page
        }));
    };

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(selectedUser?.id!));
        dispatch(setUsersSearch([]));
        onClose();
    };

    const handleListItemClick = (user: UserResponse): void => {
        if (!user.isMutedDirectMessages) {
            if (user.id !== selectedIndex) {
                setSelectedIndex(user.id);
                setSelectedUser(user);
            } else {
                setSelectedIndex(undefined);
                setSelectedUser(undefined);
            }
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitle className={classes.header}>
                <CloseButton onClose={onClose}/>
                Tin nhắn mới
                <Button
                    onClick={handleClickAddUserToChat}
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!selectedIndex}
                >
                    Tiếp
                </Button>
            </DialogTitle>
            <DialogContent id="scrollableDiv" className={classes.content}>
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <form onSubmit={handleSubmitSearch}>
                        <MessagesModalInput
                            fullWidth
                            placeholder="Tìm người dùng"
                            variant="outlined"
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SearchIcon}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    <Divider/>
                    {isUsersSearchLoading && users.length === 0 && <Spinner/>}
                    {!isUsersSearchLoading && normalizeUserSearchQuery(text) && users.length === 0 && (
                        <Typography variant="body2" color="textSecondary" style={{padding: 16}}>
                            Không tìm thấy người dùng. Thử tìm theo tên hoặc @username (không cần dấu @).
                        </Typography>
                    )}
                    <List component="nav">
                        {users.map((user) => (
                            <ListItem
                                key={user.id}
                                selected={selectedIndex === user.id!}
                                disabled={user.isMutedDirectMessages || user.id === myProfileId}
                                onClick={() => handleListItemClick(user)}
                                button
                            >
                                <MessagesModalUser user={user}/>
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
