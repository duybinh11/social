import React, {FC, memo, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {MuteIcon, UnmuteIcon} from "../../../icons";
import {processUserToMuteList} from "../../../store/ducks/user/actionCreators";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";

interface MuteUserButtonProps {
    tweetId: number;
    userId: number;
    username: string;
    isUserMuted: boolean;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo((
    {
        tweetId,
        userId,
        username,
        isUserMuted,
    }
): ReactElement => {
    const dispatch = useDispatch();

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({userId, tweetId}));
        dispatch(setOpenSnackBar(`@${username} ${isUserMuted ? "đã bỏ hạn chế" : "đã hạn chế"}.`));
    };

    return (
        <ListItem id={"onMuteUser"} onClick={onMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography variant={"body1"} component={"span"}>
                {isUserMuted ? "Bỏ hạn chế" : "Hạn chế"} @{username}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
