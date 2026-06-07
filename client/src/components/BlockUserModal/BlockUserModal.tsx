import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useBlockUserModalStyles} from "./BlockUserModalStyles";

interface BlockUserModalProps {
    username: string;
    isUserBlocked: boolean;
    visible?: boolean;
    onClose: () => void;
    onBlockUser: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlockUserModal: FC<BlockUserModalProps> = (
    {
        username,
        isUserBlocked,
        visible,
        onClose,
        onBlockUser
    }
): ReactElement | null => {
    const classes = useBlockUserModalStyles();

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            className={classes.dialog}
            open={visible}
            onClick={handleClick}
            onClose={onClose}
        >
            <DialogContent>
                <Typography variant={"h5"} component={"div"}>
                    {isUserBlocked ? "Bỏ chặn" : "Chặn"} @{username}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"} className={classes.text}>
                    {isUserBlocked ? (
                        "Họ sẽ có thể theo dõi bạn và xem tweet của bạn."
                    ) : (
                        `Họ sẽ không thể theo dõi hoặc xem tweet của bạn, và bạn sẽ không thấy tweet hay thông báo từ @${username}.`
                    )}
                </Typography>
                <Button
                    className={
                        classNames(
                            classes.containedButton,
                            isUserBlocked ? classes.unblockButton : classes.blockButton
                        )
                    }
                    onClick={onBlockUser}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    {isUserBlocked ? "Bỏ chặn" : "Chặn"}
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    size="large"
                    fullWidth
                >
                    Hủy
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BlockUserModal;
