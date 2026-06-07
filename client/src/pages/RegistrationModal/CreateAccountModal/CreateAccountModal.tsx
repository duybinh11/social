import React, {FC, ReactElement, useState} from 'react';
import {Button, Dialog, DialogContent, Link as MuiLink, Typography} from "@material-ui/core";

import {useCreateAccountModalStyles} from "./CreateAccountModalStyles";
import {RegistrationInputField} from "../RegistrationInput/RegistrationInputField";
import {RegistrationInfo} from "../../Authentication/Authentication";
import {AuthApi} from "../../../services/api/authApi";
import Spinner from "../../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../../util/globalClasses";
import {TWITTER_COOKIES, TWITTER_PRIVACY, TWITTER_TOS_NEW} from "../../../util/url";

interface CustomizeModalProps {
    open: boolean;
    onClose: () => void;
    registrationInfo: RegistrationInfo;
    onOpenEmailVerification: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CreateAccountModal: FC<CustomizeModalProps> = (
    {
        open,
        onClose,
        registrationInfo,
        onOpenEmailVerification
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useCreateAccountModalStyles();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = (): void => {
        setIsLoading(true);

        AuthApi.sendRegistrationCode(registrationInfo)
            .then((response) => {
                setIsLoading(false);
                onOpenEmailVerification(true);
            })
            .catch((error) => {
                console.log(error.reponse);
                setIsLoading(false);
            });
    };

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
                <Typography component={"div"} className={classes.title}>
                    Bước 3 / 5
                </Typography>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    <>
                        <Typography variant={"h5"} component={"div"} className={classes.subtitle}>
                            Tạo tài khoản của bạn
                        </Typography>
                        <div className={classes.form}>
                            <RegistrationInputField
                                label="Tên"
                                variant="filled"
                                value={registrationInfo.username}
                                fullWidth
                                disabled
                            />
                            <RegistrationInputField
                                label="Email"
                                variant="filled"
                                value={registrationInfo.email}
                                fullWidth
                                disabled
                            />
                            <RegistrationInputField
                                label="Ngày sinh"
                                variant="filled"
                                value={registrationInfo.birthday}
                                fullWidth
                                disabled
                            />
                        </div>
                        <Typography variant={"body1"} component={"div"} className={classes.text}>
                            {"Khi đăng ký, bạn đồng ý với "}
                            <MuiLink href={TWITTER_TOS_NEW} variant="body1" target="_blank" rel="noopener">
                                Điều khoản dịch vụ
                            </MuiLink>
                            {" và "}
                            <MuiLink href={TWITTER_PRIVACY} variant="body1" target="_blank" rel="noopener">
                                Chính sách quyền riêng tư
                            </MuiLink>
                            {", bao gồm "}
                            <MuiLink href={TWITTER_COOKIES} variant="body1" target="_blank" rel="noopener">
                                Sử dụng cookie
                            </MuiLink>
                            {". Người khác có thể tìm bạn qua email hoặc số điện thoại nếu bạn cung cấp · "}
                            <MuiLink href={TWITTER_PRIVACY} variant="body1" target="_blank" rel="noopener">
                                Tùy chọn quyền riêng tư
                            </MuiLink>
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            Đăng ký
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateAccountModal;
