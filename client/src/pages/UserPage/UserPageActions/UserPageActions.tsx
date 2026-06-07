import React, {memo, ReactElement, useState} from "react";
import {ClickAwayListener, List} from "@material-ui/core";
import {useSelector} from "react-redux";

import {useUserPageActionsStyles} from "./UserPageActionsStyles";
import {EditIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {
    selectUserProfileIsPrivateProfile,
    selectUserProfileIsUserBlocked,
} from "../../../store/ducks/userProfile/selectors";
import AddUserToListsButton from "./AddUserToListsButton/AddUserToListsButton";
import CopyProfileLinkButton from "./CopyProfileLinkButton/CopyProfileLinkButton";
import MuteUserButton from "./MuteUserButton/MuteUserButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";

const UserPageActions = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageActionsStyles();
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                <span className={globalClasses.userPageIconButton}>
                    <ActionIconButton actionText={"Thêm"} onClick={handleClick} icon={EditIcon}/>
                </span>
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            {!isPrivateProfile && (
                                <>
                                    <AddUserToListsButton/>
                                    {!isUserBlocked && (
                                        <CopyProfileLinkButton onCloseUserPageActions={handleClickAway}/>
                                    )}
                                </>
                            )}
                            {!isUserBlocked && (
                                <MuteUserButton onCloseUserPageActions={handleClickAway}/>
                            )}
                            <BlockUserButton/>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
});

export default UserPageActions;
