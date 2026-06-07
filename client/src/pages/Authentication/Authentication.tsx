import React, {FC, ReactElement, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, List, ListItem, Typography} from '@material-ui/core';
import VkuLogo from "../../components/VkuLogo/VkuLogo";

import {useAuthenticationStyles} from "./AuthenticationStyles";
import {CommunityIcon, ReplyIcon, SearchIcon} from "../../icons";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import CustomizeModal from "../RegistrationModal/CustomizeModal/CustomizeModal";
import CreateAccountModal from "../RegistrationModal/CreateAccountModal/CreateAccountModal";
import EmailVerificationModal from "../RegistrationModal/EmailVerificationModal/EmailVerificationModal";
import SetPasswordModal from "../RegistrationModal/SetPasswordModal/SetPasswordModal";
import {ACCOUNT_LOGIN} from "../../util/pathConstants";

export interface RegistrationInfo {
    username: string;
    email: string;
    birthday: string;
}

const Authentication: FC = (): ReactElement => {
    const classes = useAuthenticationStyles();
    const history = useHistory();
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
        username: "", email: "", birthday: "",
    });
    const [visibleRegistrationModal, setVisibleRegistrationModal] = useState<boolean>(false);
    const [visibleCustomizeModal, setVisibleCustomizeModal] = useState<boolean>(false);
    const [visibleCreteAccountModal, setVisibleCreteAccountModal] = useState<boolean>(false);
    const [visibleEmailVerificationModal, setVisibleEmailVerificationModal] = useState<boolean>(false);
    const [visibleSetPasswordModal, setVisibleSetPasswordModal] = useState<boolean>(false);

    const handleClickOpenSignIn = (): void => {
        history.push(ACCOUNT_LOGIN);
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleRegistrationModal(true);
    };

    const handleCloseModal = (): void => {
        setVisibleRegistrationModal(false);
        setVisibleCustomizeModal(false);
        setVisibleCreteAccountModal(false);
        setVisibleEmailVerificationModal(false);
        setVisibleSetPasswordModal(false);
    };

    const onChangeRegistrationInfo = (data: RegistrationInfo): void => {
        setRegistrationInfo(data);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.leftSide}>
                <VkuLogo className={classes.leftSideLogo} alt=""/>
                <List className={classes.leftSideListInfo}>
                    <ListItem>
                        <Typography variant="h6">
                            <>{SearchIcon}</> Theo dõi sở thích của bạn.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{CommunityIcon}</> Nghe mọi người đang nói gì.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{ReplyIcon}</> Tham gia cuộc trò chuyện.
                        </Typography>
                    </ListItem>
                </List>
            </section>
            <section className={classes.rightSide}>
                <div className={classes.rightSideWrapper}>
                    <VkuLogo height={45} width={45} className={classes.rightSideLogo}/>
                    <Typography className={classes.rightSideTittle} variant="h4">
                        Xem chuyện gì đang xảy ra trên VKU
                    </Typography>
                    <Typography>
                        <b>Tham gia VKU Social ngay hôm nay!</b>
                    </Typography>
                    <br/>
                    <Button
                        className={classes.signinButton}
                        onClick={handleClickOpenSignUp}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Đăng ký
                    </Button>
                    <Button
                        className={classes.signinButton}
                        onClick={handleClickOpenSignIn}
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Đăng nhập
                    </Button>
                    <RegistrationModal
                        open={visibleRegistrationModal}
                        onClose={handleCloseModal}
                        onOpenCustomize={setVisibleCustomizeModal}
                        onChangeRegistrationInfo={onChangeRegistrationInfo}
                    />
                    <CustomizeModal
                        open={visibleCustomizeModal}
                        onClose={handleCloseModal}
                        onOpenCreateAccount={setVisibleCreteAccountModal}
                    />
                    <CreateAccountModal
                        open={visibleCreteAccountModal}
                        onClose={handleCloseModal}
                        registrationInfo={registrationInfo}
                        onOpenEmailVerification={setVisibleEmailVerificationModal}
                    />
                    <EmailVerificationModal
                        email={registrationInfo.email}
                        open={visibleEmailVerificationModal}
                        onClose={handleCloseModal}
                        onOpenSetPassword={setVisibleSetPasswordModal}
                    />
                    <SetPasswordModal
                        email={registrationInfo.email}
                        open={visibleSetPasswordModal}
                        onClose={handleCloseModal}
                    />
                </div>
            </section>
        </div>
    );
};

export default Authentication;
