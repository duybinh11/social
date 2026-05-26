import React, {FC, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button/Button";

import {useUnfollowButtonStyles} from "./UnfollowButtonStyles";
import {UserResponse} from "../../../store/types/user";
import {processFollowRequest, unfollowUser} from "../../../store/ducks/user/actionCreators";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";

interface UnfollowButtonProps {
    user?: UserResponse
}

const UnfollowButton: FC<UnfollowButtonProps> = ({user}): ReactElement => {
    const classes = useUnfollowButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Đang theo dõi");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleUnfollow = (): void => {
        if (user?.isPrivateProfile) {
            dispatch(processFollowRequest(user.id!));
        } else {
            dispatch(unfollowUser({userId: user?.id!}));
            setVisibleUnfollowModal(false);
        }
    };

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={handleClickOpenUnfollowModal}
                onMouseOver={() => setBtnText("Bỏ theo dõi")}
                onMouseLeave={() => setBtnText("Đang theo dõi")}
                color="primary"
                variant="contained"
                size="small"
            >
                {btnText}
            </Button>
            <UnfollowModal
                fullName={user?.fullName!}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
        </>
    );
};

export default UnfollowButton;
