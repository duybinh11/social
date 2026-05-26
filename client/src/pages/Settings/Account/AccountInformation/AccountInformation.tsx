import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Link as MuiLink, List, ListItem, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';

import {ArrowRightIcon} from "../../../../icons";
import {
    selectUserDataIsPrivateProfile,
    selectUserProfileCountryCode,
    selectUserProfileEmail,
    selectUserProfileGender,
    selectUserProfileLanguage,
    selectUserProfilePhone,
    selectUserProfileRegistrationDate,
    selectUserProfileUsername
} from "../../../../store/ducks/user/selectors";
import {formatScheduleDate} from "../../../../util/formatDate";
import {getCountry, getPhoneCode} from "../../../../util/countryCodes";
import {fetchUserData} from "../../../../store/ducks/user/actionCreators";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES,
    SETTINGS_INFO_AGE,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_GENDER,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE
} from "../../../../util/pathConstants";

const AccountInformation: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const username = useSelector(selectUserProfileUsername);
    const countryCode = useSelector(selectUserProfileCountryCode);
    const phone = useSelector(selectUserProfilePhone);
    const email = useSelector(selectUserProfileEmail);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const registrationDate = useSelector(selectUserProfileRegistrationDate);
    const language = useSelector(selectUserProfileLanguage);
    const gender = useSelector(selectUserProfileGender);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    return (
        <div className={globalClasses.listItemWrapper}>
            <List>
                <Link to={SETTINGS_INFO_USERNAME}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Tên người dùng
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                @{username}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_PHONE}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Điện thoại
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {`${getPhoneCode(countryCode)}${phone}`}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_EMAIL}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Email
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {email}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Đã xác minh
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {"No. "}
                        <MuiLink variant="subtitle2">
                            Request Verification
                        </MuiLink>
                    </Typography>
                </div>
                <Divider/>
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Tweet được bảo vệ
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {isPrivateProfile ? "Có" : "Không"}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Tạo tài khoản
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {formatScheduleDate(new Date(registrationDate!))}
                    </Typography>
                </div>
                <Divider/>
                <Link to={SETTINGS_INFO_COUNTRY}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Quốc gia
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {getCountry(countryCode)}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Ngôn ngữ
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {language}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_GENDER}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Giới tính
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {gender}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Ngày sinh
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {"Add your date of birth to your "}
                        <MuiLink variant="subtitle2">
                            profile.
                        </MuiLink>
                    </Typography>
                </div>
                <Divider/>
                <Link to={SETTINGS_INFO_AGE}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Tuổi
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                13-64
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
};

export default withDocumentTitle(AccountInformation)("Thông tin tài khoản");
