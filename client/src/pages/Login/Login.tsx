import React, {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {History, LocationState} from "history";
import {Link, useHistory} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import VkuLogo from "../../components/VkuLogo/VkuLogo";

import {LoginTextField} from "./LoginInputField";
import {useLoginStyles} from "./LoginStyles";
import {selectUserIsError, selectUserStatus} from "../../store/ducks/user/selectors";
import {fetchSignIn, setUserLoadingStatus} from "../../store/ducks/user/actionCreators";
import {ACCOUNT_FORGOT, ACCOUNT_SIGNIN} from "../../util/pathConstants";
import {LoadingStatus} from "../../store/types/common";

export interface LoginProps {
    email: string;
    password: string;
    history: History<LocationState>;
}

const Login: FC = (): ReactElement => {
    const classes = useLoginStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const errorStatus = useSelector(selectUserIsError);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.LOADING));
        };
    }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchSignIn({email, password, history}));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    return (
        <div className={classes.container}>
            <div>
                <VkuLogo height={45} width={45}/>
            </div>
            <Typography variant={"h4"} component={"div"}>
                Đăng nhập VKU
            </Typography>
            {(errorStatus) && (
                <Typography variant={"body1"} component={"div"} className={classes.error}>
                    Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <div className={classes.input}>
                    <LoginTextField
                        label="Số điện thoại, email hoặc tên người dùng"
                        type="email"
                        variant="filled"
                        onChange={handleChangeEmail}
                        value={email}
                    />
                </div>
                <div className={classes.input}>
                    <LoginTextField
                        label="Mật khẩu"
                        type="password"
                        variant="filled"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(email && password)}
                    fullWidth
                >
                    Đăng nhập
                </Button>
            </form>
            <div className={classes.footer}>
                <Typography variant={"body1"} component={"span"}>
                    <Link to={ACCOUNT_FORGOT}>
                        Quên mật khẩu?
                    </Link>
                </Typography>
                {" · "}
                <Typography variant={"body1"} component={"span"}>
                    <Link to={ACCOUNT_SIGNIN}>
                        Đăng ký
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Login;
