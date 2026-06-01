import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";

import {ArrowRightIcon, KeyIcon, ProfileIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";
import {SETTINGS_INFO, SETTINGS_PASSWORD} from "../../../util/pathConstants";

const Account: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <Typography variant={"subtitle2"} component={"div"} className={globalClasses.itemInfoWrapper}>
                Xem và cập nhật thông tin tài khoản hoặc đổi mật khẩu.
            </Typography>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={SETTINGS_INFO}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {ProfileIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Thông tin tài khoản
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Xem số điện thoại, email và các thông tin khác của tài khoản.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_PASSWORD}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {KeyIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Đổi mật khẩu
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Đổi mật khẩu bất cứ lúc nào.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(Account)("Cài đặt");
