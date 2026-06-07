import React, {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

import {useFindEmailStyles} from "./FindEmailStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {AuthApi} from "../../../services/api/authApi";
import { ACCOUNT_FORGOT_SEND_PASSWORD_RESET } from '../../../util/pathConstants';

const FindEmail: FC = (): ReactElement => {
    const classes = useFindEmailStyles();
    const history = useHistory();
    const [error, setError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.findExistingEmail({email})
            .then(() => {
                setError(false);
                history.push({pathname: ACCOUNT_FORGOT_SEND_PASSWORD_RESET, state: {email: email}});
            })
            .catch(() => setError(true));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    return (
        <>
            {error ? (
                <>
                    <Typography component={"div"} className={classes.warning}>
                        Chúng tôi không tìm thấy tài khoản với thông tin đó
                    </Typography>
                    <Typography variant={"body1"} component={"div"} className={classes.text}>
                        Vui lòng thử tìm lại email, số điện thoại hoặc tên người dùng.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant={"h3"} component={"div"}>
                        Tìm tài khoản Twitter của bạn
                    </Typography>
                    <Typography variant={"body1"} component={"div"} className={classes.text}>
                        Nhập email, số điện thoại hoặc tên người dùng.
                    </Typography>
                </>
            )}
            <form onSubmit={findExistingEmail}>
                <ForgotPasswordTextField
                    variant="outlined"
                    onChange={handleChangeEmail}
                    value={email}
                />
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Tìm kiếm
                </Button>
            </form>
        </>
    );
};

export default FindEmail;
