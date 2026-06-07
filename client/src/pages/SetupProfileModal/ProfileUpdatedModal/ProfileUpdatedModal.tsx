import React, {FC, ReactElement} from 'react';
import {useProfileUpdatedModalStyles} from "./ProfileUpdatedModalStyles";
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import VkuLogo from "../../../components/VkuLogo/VkuLogo";

interface ProfileUpdatedModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void>;
}

const ProfileUpdatedModal: FC<ProfileUpdatedModalProps> = ({open, onClose, onSubmit}): ReactElement => {
    const classes = useProfileUpdatedModalStyles();

    return (
        <Dialog transitionDuration={0} open={open} onClose={onClose} hideBackdrop>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <VkuLogo height={50} width={50}/>
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    Hồ sơ của bạn đã được cập nhật
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button
                        className={classes.button}
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                        Xem hồ sơ
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileUpdatedModal;
