import React, {FC, ReactElement, useEffect} from 'react';
import {NavLink, Route, useLocation} from 'react-router-dom';
import {List, ListItem, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useSettingsStyles} from "./SettingsStyles";
import {ArrowRightIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import BackButton from "../../components/BackButton/BackButton";
import Account from "./Account/Account";
import AccountInformation from "./Account/AccountInformation/AccountInformation";
import ChangeUsername from "./Account/AccountInformation/ChangeUsername/ChangeUsername";
import ChangePhone from "./Account/AccountInformation/ChangePhone/ChangePhone";
import ChangeEmail from "./Account/AccountInformation/ChangeEmail/ChangeEmail";
import ChangeCountry from "./Account/AccountInformation/ChangeCountry/ChangeCountry";
import ChangeYourPassword from "./Account/ChangeYourPassword/ChangeYourPassword";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import {
    SETTINGS,
    SETTINGS_INFO,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_PASSWORD
} from "../../util/pathConstants";

const Settings: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const location = useLocation();
    const classes = useSettingsStyles();

    useEffect(() => {
        if (location.pathname === SETTINGS) {
            return;
        }
    }, [location.pathname]);

    return (
        <div className={classes.settingsLayout}>
            <div className={classes.settingsNavColumn}>
                <Paper className={classes.container} variant="outlined">
                    <Paper className={classnames(globalClasses.pageHeader, classes.leftSideHeader)} variant="outlined">
                        <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                            Cài đặt
                        </Typography>
                    </Paper>
                    <div className={classnames(classes.listWrapper, globalClasses.contentWrapper, globalClasses.svg)}>
                        <List component="nav" aria-label="settings navigation">
                            <NavLink to={SETTINGS}>
                                <ListItem selected={location.pathname === SETTINGS}>
                                    <Typography variant={"body1"} component={"span"}>
                                        Tài khoản của bạn
                                    </Typography>
                                    {ArrowRightIcon}
                                </ListItem>
                            </NavLink>
                        </List>
                    </div>
                </Paper>
            </div>
            <div className={classes.settingsDetailColumn}>
                <Paper className={classnames(globalClasses.pageHeader, classes.rightSideHeader)} variant="outlined">
                    <Route exact path={SETTINGS}>
                        <Typography variant="h5">
                            Tài khoản của bạn
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO}>
                        <BackButton/>
                        <Typography variant="h5">
                            Thông tin tài khoản
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_USERNAME}>
                        <BackButton/>
                        <Typography variant="h5">
                            Đổi tên người dùng
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_PHONE}>
                        <BackButton/>
                        <Typography variant="h5">
                            Đổi số điện thoại
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_EMAIL}>
                        <BackButton/>
                        <Typography variant="h5">
                            Đổi email
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_INFO_COUNTRY}>
                        <BackButton/>
                        <Typography variant="h5">
                            Đổi quốc gia
                        </Typography>
                    </Route>
                    <Route exact path={SETTINGS_PASSWORD}>
                        <BackButton/>
                        <Typography variant="h5">
                            Đổi mật khẩu
                        </Typography>
                    </Route>
                </Paper>
                <Paper className={classnames(globalClasses.pageContainer, classes.pageContainer)} variant="outlined">
                    <div className={classnames(globalClasses.contentWrapper, classes.detailContent)}>
                        <Route exact path={SETTINGS} component={Account}/>
                        <Route exact path={SETTINGS_INFO} component={AccountInformation}/>
                        <Route exact path={SETTINGS_INFO_USERNAME} component={ChangeUsername}/>
                        <Route exact path={SETTINGS_INFO_PHONE} component={ChangePhone}/>
                        <Route exact path={SETTINGS_INFO_EMAIL} component={ChangeEmail}/>
                        <Route exact path={SETTINGS_INFO_COUNTRY} component={ChangeCountry}/>
                        <Route exact path={SETTINGS_PASSWORD} component={ChangeYourPassword}/>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default withDocumentTitle(Settings)("Cài đặt");
