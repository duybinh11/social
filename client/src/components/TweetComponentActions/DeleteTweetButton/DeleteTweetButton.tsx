import React, {FC, memo, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {DeleteIcon} from "../../../icons";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import {deleteTweetReply} from "../../../store/ducks/tweet/actionCreators";
import {fetchDeleteTweet} from "../../../store/ducks/tweets/actionCreators";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";

interface DeleteTweetButtonProps {
    tweetId: number;
    addressedTweetId?: number;
    onCloseActionsDropdown: () => void;
}

const DeleteTweetButton: FC<DeleteTweetButtonProps> = memo((
    {
        tweetId,
        addressedTweetId,
        onCloseActionsDropdown
    }
): ReactElement => {
    const dispatch = useDispatch();
    const [visibleDeleteTweetModal, setVisibleDeleteTweetModal] = useState<boolean>(false);

    const onDeleteUserTweet = (): void => {
        if (addressedTweetId) {
            dispatch(deleteTweetReply(tweetId));
        } else {
            dispatch(fetchDeleteTweet(tweetId));
        }
        dispatch(setOpenSnackBar("Bài viết của bạn đã bị xóa"));
        setVisibleDeleteTweetModal(false);
        onCloseActionsDropdown();
    };

    const onOpenTweetComponentActionsModal = (): void => {
        setVisibleDeleteTweetModal(true);
    };

    const onCloseTweetComponentActionsModal = (): void => {
        setVisibleDeleteTweetModal(false);
    };

    return (
        <>
            <ListItem id={"delete"} onClick={onOpenTweetComponentActionsModal}>
                <>{DeleteIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    Xóa
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                modalTitle={"Xóa"}
                visibleTweetComponentActionsModal={visibleDeleteTweetModal}
                onCloseTweetComponentActionsModal={onCloseTweetComponentActionsModal}
                onClick={onDeleteUserTweet}
            />
        </>
    );
});

export default DeleteTweetButton;
