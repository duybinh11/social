import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useProfileDescriptionModalStyles} from "./ProfileDescriptionModalStyles";
import ProfileDescriptionInput from "./ProfileDescriptionInput/ProfileDescriptionInput";

interface ProfileDescriptionModalProps {
    open: boolean;
    onClose: () => void;
    text: string;
    onChangeText: (value: string | ((prevVar: string) => string)) => void;
    onOpenProfileUpdatedModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfileDescriptionModal: FC<ProfileDescriptionModalProps> = (
    {
        open,
        onClose,
        text,
        onChangeText,
        onOpenProfileUpdatedModal
    }
): ReactElement => {
    const classes = useProfileDescriptionModalStyles();

    return (
        <Dialog transitionDuration={0} open={open} onClose={onClose} hideBackdrop>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography variant={"h3"} component={"div"}>
                    Mô tả bản thân
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Điều gì làm bạn đặc biệt? Đừng suy nghĩ quá, hãy thoải mái.
                </Typography>
                <ProfileDescriptionInput
                    value={text}
                    onChange={(event) => onChangeText(event.target.value)}
                    name={"about"}
                    label={"Tiểu sử của bạn"}
                    maxTextLength={160}
                />
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileUpdatedModal(true)}
                    variant={text ? "contained" : "text"}
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    {text ? "Tiếp" : "Bỏ qua"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDescriptionModal;
