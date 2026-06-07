import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Button, Link as MuiLink, Radio, Typography} from "@material-ui/core";

import {AuthApi} from "../../../services/api/authApi";
import {useResetPasswordOptionStyles} from "./ResetPasswordOptionStyles";
import {ACCOUNT_FORGOT_CONFIRM_PIN_RESET} from "../../../util/pathConstants";
import {REGAIN_ACCESS} from "../../../util/url";

const ResetPasswordOption: FC = (): ReactElement => {
    const classes = useResetPasswordOptionStyles();
    const history = useHistory();
    const location = useLocation<{ email: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setIsLoading(true);
        AuthApi.sendPasswordResetCode({email: location.state.email})
            .then(() => {
                history.push(ACCOUNT_FORGOT_CONFIRM_PIN_RESET);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Typography variant={"h3"} component={"div"}>
                Bạn muốn đặt lại mật khẩu bằng cách nào?
            </Typography>
            <Typography variant={"body1"} component={"div"} className={classes.text}>
                Bạn có thể dùng thông tin liên kết với tài khoản.
            </Typography>
            <form className={classes.formWrapper} onSubmit={sendResetCode}>
                <div className={classes.emailWrapper}>
                    <Radio className={classes.radio} checked color="primary"/>
                    <Typography variant={"body1"} component={"span"}>
                        {"Gửi email đến "}
                    </Typography>
                    <Typography variant={"h6"} component={"span"}>
                        {location.state.email}
                    </Typography>
                </div>
                <Button
                    className={classes.button}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Tiếp
                </Button>
            </form>
            <MuiLink href={REGAIN_ACCESS} variant="subtitle2" target="_blank" rel="noopener">
                Không truy cập được?
            </MuiLink>
        </>
    );
};

export default ResetPasswordOption;
