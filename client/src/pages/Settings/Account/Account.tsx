import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Typography} from "@material-ui/core";

import {ArrowRightIcon, CommunityIcon, DeleteAccountIcon, DownloadIcon, KeyIcon, ProfileIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";
import {SETTINGS_DEACTIVATE, SETTINGS_INFO, SETTINGS_PASSWORD, SETTINGS_TEAMS} from "../../../util/pathConstants";

const Account: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <Typography variant={"subtitle2"} component={"div"} className={globalClasses.itemInfoWrapper}>
                See information about your account, download an archive of your data, or learn about your
                account deactivation options
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
                                    See your account information like your phone number and email address.
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
                    <ListItem>
                        <div className={globalClasses.listIconWrapper}>
                            {DownloadIcon}
                        </div>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Tải bản lưu dữ liệu của bạn
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                Get insights into the type of information stored for your account.
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                    <Link to={SETTINGS_TEAMS}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {CommunityIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Nhóm TweetDeck
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Invite anyone to Tweet from this account using the Teams feature in
                                    TweetDeck.
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_DEACTIVATE}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DeleteAccountIcon}
                            </div>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Vô hiệu hóa tài khoản
                                </Typography>
                                <Typography variant={"subtitle2"} component={"div"}>
                                    Find out how you can deactivate your account.
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
