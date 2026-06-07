import React, {memo, ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

import {processUserToMuteList} from "../../../store/ducks/user/actionCreators";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import {useUserPageStyles} from "../UserPageStyles";

const UserUnmuteMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({userId: userProfileId!}));
        dispatch(setOpenSnackBar(`@${username} ${isUserMuted ? "đã bỏ hạn chế" : "đã hạn chế"}.`));
    };

    return (
        <>
            {userProfileId && (
                isUserMuted && (
                    <Typography variant={"subtitle1"} component={"div"} className={classes.description}>
                        {"Bạn đã hạn chế tweet từ tài khoản này. "}
                        <Typography
                            id={"unmuteUser"}
                            className={classes.unfollowLink}
                            onClick={onMuteUser}
                            variant={"subtitle1"}
                            component={"span"}
                        >
                            Bỏ hạn chế
                        </Typography>
                    </Typography>
                )
            )}
        </>
    );
});

export default UserUnmuteMessage;
