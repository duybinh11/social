import React, {FC, ReactElement} from 'react';
import {Avatar, Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import VkuLogo from "../../../components/VkuLogo/VkuLogo";

import {useProfilePictureModalStyles} from "./ProfilePictureModalStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import {ImageObj} from "../../../components/AddTweetForm/AddTweetForm";

interface ProfilePictureModalProps {
    open: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    onChangeAvatar: (imageObj: ImageObj) => void
    onOpenProfileHeaderModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfilePictureModal: FC<ProfilePictureModalProps> = (
    {
        open,
        onClose,
        avatar,
        onChangeAvatar,
        onOpenProfileHeaderModal
    }
): ReactElement => {
    const classes = useProfilePictureModalStyles();

    return (
        <Dialog transitionDuration={0} open={open} onClose={onClose}>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <VkuLogo height={34} width={34}/>
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    Chọn ảnh đại diện
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Có ảnh selfie yêu thích? Tải lên ngay.
                </Typography>
                <div className={classes.avatarWrapper}>
                    <UploadProfileImage
                        name={"avatar"}
                        image={avatar}
                        onChangeImage={onChangeAvatar}
                        setupProfile
                    />
                    <Avatar key={avatar?.src} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG}/>
                </div>
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileHeaderModal(true)}
                    variant={avatar?.src ? "contained" : "text"}
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    {avatar?.src ? "Tiếp" : "Bỏ qua"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfilePictureModal;
