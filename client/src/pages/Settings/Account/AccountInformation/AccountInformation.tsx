import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, List, ListItem, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';

import {ArrowRightIcon} from "../../../../icons";
import {
    selectUserProfileCountryCode,
    selectUserProfileEmail,
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
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME
} from "../../../../util/pathConstants";

const AccountInformation: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const username = useSelector(selectUserProfileUsername);
    const countryCode = useSelector(selectUserProfileCountryCode);
    const phone = useSelector(selectUserProfilePhone);
    const email = useSelector(selectUserProfileEmail);
    const registrationDate = useSelector(selectUserProfileRegistrationDate);
    const formattedRegistrationDate = registrationDate
        ? formatScheduleDate(new Date(registrationDate))
        : "";

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

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
                        Tạo tài khoản
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {formattedRegistrationDate || "Chưa có thông tin"}
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
            </List>
        </div>
    );
};

export default withDocumentTitle(AccountInformation)("Thông tin tài khoản");
