import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Button, Divider, Hidden, IconButton, List, ListItem, Popover, Typography} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import classnames from "classnames";

import {
    DisplayIcon,
    ExploreIcon,
    ExploreIconFilled,
    FollowerRequestIcon,
    HelpCenterIcon,
    HomeIcon,
    HomeIconFilled,
    KeyboardShortcutsIcon,
    ListsIcon,
    ListsIconFilled,
    MessagesIcon,
    MessagesIconFilled,
    MoreIcon,
    NotificationsIcon,
    NotificationsIconFilled,
    ProfileIcon,
    ProfileIconFilled,
    SettingsIcon,
    TweetIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {
    selectUserDataFollowerRequestsSize,
    selectUserDataId,
    selectUserDataIsPrivateProfile,
    selectUserDataNotificationsCount,
    selectUserDataUnreadMessagesSize
} from "../../store/ducks/user/selectors";
import {useSideMenuStyles} from "./SideMenuStyles";
import AddTweetModal from "../AddTweetModal/AddTweetModal";
import {selectLoadingState} from "../../store/ducks/tweets/selectors";
import DisplayModal from "./DisplayModal/DisplayModal";
import {DisplayProps} from "../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";
import FollowerRequestsModal from "./FollowerRequestsModal/FollowerRequestsModal";
import {useGlobalStyles} from "../../util/globalClasses";
import {resetFollowerRequestsState} from "../../store/ducks/followerRequests/actionCreators";
import {
    HOME,
    LISTS,
    MESSAGES,
    NOTIFICATIONS,
    PROFILE,
    SEARCH,
    SETTINGS
} from "../../util/pathConstants";
import {HELP_TWITTER} from "../../util/url";
import {LoadingStatus} from "../../store/types/common";

const SideMenu: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSideMenuStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const myProfileId = useSelector(selectUserDataId);
    const notificationsCount = useSelector(selectUserDataNotificationsCount);
    const unreadMessagesSize = useSelector(selectUserDataUnreadMessagesSize);
    const followerRequestsSize = useSelector(selectUserDataFollowerRequestsSize);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const loadingStatus = useSelector(selectLoadingState);
    const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);
    const [visibleHomeNotification, setVisibleHomeNotification] = useState<boolean>(false);
    const [visibleDisplayModal, setVisibleDisplayModal] = useState<boolean>(false);
    const [visibleFollowerRequestsModal, setVisibleFollowerRequestsModal] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            setVisibleHomeNotification(true);
        } else {
            setVisibleHomeNotification(false);
        }
    }, [loadingStatus]);

    const handleClickOpenAddTweet = (): void => {
        setVisibleAddTweet(true);
    };

    const onCloseAddTweet = (): void => {
        setVisibleAddTweet(false);
    };

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const onOpenDisplayModal = (): void => {
        setVisibleDisplayModal(true);
        handleClosePopup();
    };

    const onCloseDisplayModal = (): void => {
        setVisibleDisplayModal(false);
    };

    const onOpenFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(true);
        handleClosePopup();
    };

    const onCloseFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(false);
        dispatch(resetFollowerRequestsState());
    };

    return (
        <>
            <ul className={classes.container}>
                <li>
                    <NavLink to={HOME} activeClassName={"selected"}>
                        <div className={classes.logoIcon}>
                            <IconButton color="primary">
                                {TweetIcon}
                            </IconButton>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={HOME} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {visibleHomeNotification &&
                                        <span id={"homeNotification"} className={classes.homeNotification}/>}
                                    {(location.pathname.includes(HOME)) ? (
                                        <span>{HomeIconFilled}</span>
                                    ) : (
                                        <span>{HomeIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Trang chủ
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={SEARCH} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(SEARCH)) ? (
                                        <span>{ExploreIconFilled}</span>
                                    ) : (
                                        <span>{ExploreIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Khám phá
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={NOTIFICATIONS} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {((notificationsCount ?? 0) > 0) && (
                                        <span id={"notificationsCount"} className={classes.count}>
                                            {notificationsCount}
                                        </span>
                                    )}
                                    {(location.pathname.includes(NOTIFICATIONS)) ? (
                                        <span>{NotificationsIconFilled}</span>
                                    ) : (
                                        <span>{NotificationsIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Thông báo
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={MESSAGES} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(unreadMessagesSize !== 0) && (
                                        <span className={classes.count}>
                                            {unreadMessagesSize}
                                        </span>
                                    )}
                                    {(location.pathname.includes(MESSAGES)) ? (
                                        <span>{MessagesIconFilled}</span>
                                    ) : (
                                        <span>{MessagesIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Tin nhắn
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={LISTS} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(LISTS)) ? (
                                        <span>{ListsIconFilled}</span>
                                    ) : (
                                        <span>{ListsIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Danh sách
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={`${PROFILE}/${myProfileId}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(`${PROFILE}/${myProfileId}`)) ? (
                                        <span>{ProfileIconFilled}</span>
                                    ) : (
                                        <span>{ProfileIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Hồ sơ
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <div
                        id={"openPopup"}
                        aria-describedby={popoverId}
                        onClick={handleOpenPopup}
                    >
                        <Hidden smDown>
                            <>
                                <span>{MoreIcon}</span>
                                <Typography variant={"h5"}>
                                    Thêm
                                </Typography>
                            </>
                        </Hidden>
                    </div>
                    <Popover
                        id={popoverId}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopup}
                        classes={{
                            paper: classes.popover,
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <div className={classnames(classes.listItemWrapper, globalClasses.svg)}>
                            <List>
                                {(isPrivateProfile) && (
                                    <ListItem id={"openFollowerRequestsModal"} onClick={onOpenFollowerRequestsModal}>
                                        {FollowerRequestIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Yêu cầu theo dõi
                                            <span className={classes.followerRequestsCount}>
                                                {followerRequestsSize}
                                            </span>
                                        </Typography>
                                    </ListItem>
                                )}
                                <Divider/>
                                <Link to={SETTINGS}>
                                    <ListItem id={"closePopup"} onClick={handleClosePopup}>
                                        {SettingsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Cài đặt và quyền riêng tư
                                        </Typography>
                                    </ListItem>
                                </Link>
                                <a href={HELP_TWITTER} target="_blank">
                                    <ListItem>
                                        {HelpCenterIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Trung tâm trợ giúp
                                        </Typography>
                                    </ListItem>
                                </a>
                                <ListItem id={"openDisplayModal"} onClick={onOpenDisplayModal}>
                                    {DisplayIcon}
                                    <Typography variant={"body1"} component={"span"}>
                                        Hiển thị
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {KeyboardShortcutsIcon}
                                    <Typography variant={"body1"} component={"span"}>
                                        Phím tắt
                                    </Typography>
                                </ListItem>
                            </List>
                        </div>
                    </Popover>
                </li>
                <li className={classes.itemWrapper}>
                    <Button
                        onClick={handleClickOpenAddTweet}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        <Hidden smDown>
                            Đăng
                        </Hidden>
                        <Hidden mdUp>
                            <CreateIcon/>
                        </Hidden>
                    </Button>
                    <AddTweetModal visible={visibleAddTweet} onClose={onCloseAddTweet}/>
                    <FollowerRequestsModal
                        visible={visibleFollowerRequestsModal}
                        onClose={onCloseFollowerRequestsModal}
                    />
                    <DisplayModal
                        visible={visibleDisplayModal}
                        onClose={onCloseDisplayModal}
                        changeBackgroundColor={changeBackgroundColor}
                        changeColorScheme={changeColorScheme}
                    />
                </li>
            </ul>
            <UserSideProfile/>
        </>
    );
};

export default SideMenu;
