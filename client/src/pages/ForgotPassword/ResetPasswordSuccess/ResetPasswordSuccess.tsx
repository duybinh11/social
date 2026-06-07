import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useResetPasswordSuccessStyles} from "./ResetPasswordSuccessStyles";
import {ACCOUNT_LOGIN} from '../../../util/pathConstants';
import {DEVELOPER_ACCOUNT, HOW_TO_UPDATE_YOUR_ACCOUNT_PHONE_NUMBER} from "../../../util/url";

const ResetPasswordSuccess: FC = (): ReactElement => {
    const classes = useResetPasswordSuccessStyles();

    return (
        <>
            <Typography variant={"h3"} component={"div"}>
                Xong rồi. Bạn đã đổi mật khẩu thành công.
            </Typography>
            <div className={classes.infoWrapper}>
                <MuiLink href={DEVELOPER_ACCOUNT} variant="body1" target="_blank" rel="noopener">
                    Xem lại ứng dụng
                </MuiLink>
                <Typography variant={"body1"} component={"div"}>
                    Hãy xem lại các ứng dụng có quyền truy cập tài khoản. Thu hồi quyền với ứng dụng không quen hoặc không còn dùng.
                </Typography>
            </div>
            <div className={classes.infoWrapper}>
                <MuiLink href={HOW_TO_UPDATE_YOUR_ACCOUNT_PHONE_NUMBER} variant="body1" target="_blank" rel="noopener">
                    Thêm số điện thoại vào tài khoản
                </MuiLink>
                <Typography variant={"body1"} component={"div"}>
                    Điều này giúp bạn dễ dàng lấy lại tài khoản nếu bị khóa.
                </Typography>
            </div>
            <div className={classes.footer}>
                <MuiLink variant="subtitle2" to={ACCOUNT_LOGIN} component={Link}>
                    Tiếp tục vào Twitter
                </MuiLink>
            </div>
        </>
    );
};

export default ResetPasswordSuccess;
