import React, {memo, ReactElement, useState} from "react";
import classnames from "classnames";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {
    selectUserProfileId,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import {processUserToBlocklist} from "../../../store/ducks/user/actionCreators";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";
import {useUserPageStyles} from "../UserPageStyles";

const BlockUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const [btnText, setBtnText] = useState<string>("Đã chặn");
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: userProfileId!}));
        setVisibleBlockUserModal(false);
        setBtnText(isUserBlocked ? "Đang theo dõi" : "Đã chặn");
        dispatch(setOpenSnackBar(`@${username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <>
            <Button
                className={classnames(classes.primaryButton, classes.blockButton)}
                onClick={onOpenBlockUserModal}
                onMouseOver={() => setBtnText("Bỏ chặn")}
                onMouseLeave={() => setBtnText("Đã chặn")}
                color="primary"
                variant="contained"
                size="large"
            >
                {btnText}
            </Button>
            <BlockUserModal
                username={username!}
                isUserBlocked={isUserBlocked!}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
        </>
    );
});

export default BlockUserButton;
