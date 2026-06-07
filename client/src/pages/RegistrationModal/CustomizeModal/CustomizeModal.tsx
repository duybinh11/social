import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Link as MuiLink, Radio, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useCustomizeModalStyles} from "./CustomizeModalStyles";
import {useGlobalStyles} from "../../../util/globalClasses";
import {NEW_ACCOUNT_SETTINGS} from "../../../util/url";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
    onOpenCreateAccount: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CustomizeModal: FC<CustomizeModalProps> = ({open, onClose, onOpenCreateAccount}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useCustomizeModalStyles();

    return (
        <Dialog
            className={globalClasses.modalShadow}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            hideBackdrop
        >
            <DialogContent style={{paddingTop: 0, paddingBottom: 0}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    Tùy chỉnh trải nghiệm
                </Typography>
                <Typography component={"div"} className={classes.subtitle}>
                    Theo dõi nơi bạn xem nội dung Twitter trên web
                </Typography>
                <Typography variant={"subtitle1"} component={"div"} className={classes.text}>
                    Twitter dùng dữ liệu này để cá nhân hóa trải nghiệm. Lịch sử duyệt web sẽ không bao giờ được lưu cùng tên, email hoặc số điện thoại của bạn.
                </Typography>
                <Radio className={classes.radio} color="primary" checked/>
                <Typography variant={"body1"} component={"div"}>
                    {"Để biết thêm chi tiết về cài đặt này, truy cập "}
                    <MuiLink href={NEW_ACCOUNT_SETTINGS} variant="body1" target="_blank" rel="noopener">
                        Trung tâm trợ giúp
                    </MuiLink>.
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button
                        onClick={() => onOpenCreateAccount(true)}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        Tiếp
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomizeModal;
