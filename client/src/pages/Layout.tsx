import React, {FC, ReactElement, ReactNode} from 'react';
import {Typography} from '@material-ui/core';
import {useLocation} from "react-router-dom";
import {getYear} from "date-fns";
import {useSelector} from "react-redux";
import classnames from "classnames";

import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from '../components/Users/Users';
import {useLayoutStyles} from "./LayoutStyles";
import SideSearch from "../components/SideSearch/SideSearch";
import {EditIcon} from "../icons";
import {DisplayProps} from "./Settings/AccessibilityDisplayLanguages/Display/Display";
import ProfileImages from "../components/ProfileImages/ProfileImages";
import {selectImages} from "../store/ducks/userProfile/selectors";
import {SETTINGS} from "../util/pathConstants";
import {TWITTER_ADS_WORK, TWITTER_COOKIES, TWITTER_PRIVACY, TWITTER_TOS} from "../util/url";

interface Layout {
    children: ReactNode;
}

export const Layout: FC<Layout & DisplayProps> = (
    {
        children,
        changeBackgroundColor,
        changeColorScheme
    }
): ReactElement => {
    const classes = useLayoutStyles();
    const location = useLocation();
    const tweetImages = useSelector(selectImages);
    const isFullWidthPage = location.pathname.includes("/message") || location.pathname.includes(SETTINGS);

    if (location.pathname.includes("/account")) {
        return <div>{children}</div>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.pageLayout}>
                <aside className={classes.leftRail}>
                    <SideMenu
                        changeBackgroundColor={changeBackgroundColor}
                        changeColorScheme={changeColorScheme}
                    />
                </aside>
                <main className={classnames(classes.mainColumn, {[classes.mainColumnFull]: isFullWidthPage})}>
                    {children}
                </main>
                {!isFullWidthPage && (
                    <aside className={classes.rightRail}>
                        <SideSearch/>
                        <Tags/>
                        <Users/>
                        {tweetImages.length !== 0 && <ProfileImages/>}
                        <div className={classes.footer}>
                            <div>
                                <a href={TWITTER_TOS} target="_blank" rel="noreferrer">
                                    <Typography component={"span"}>
                                        Điều khoản dịch vụ
                                    </Typography>
                                </a>
                                <a href={TWITTER_PRIVACY} target="_blank" rel="noreferrer">
                                    <Typography component={"span"}>
                                        Chính sách quyền riêng tư
                                    </Typography>
                                </a>
                                <a href={TWITTER_COOKIES} target="_blank" rel="noreferrer">
                                    <Typography component={"span"}>
                                        Cookie Policy
                                    </Typography>
                                </a>
                            </div>
                            <div>
                                <a href={TWITTER_ADS_WORK} target="_blank" rel="noreferrer">
                                    <Typography component={"span"}>
                                        Thông tin quảng cáo
                                    </Typography>
                                </a>
                                <Typography component={"span"}>
                                    More {EditIcon}
                                </Typography>
                                <Typography component={"span"}>
                                    {`© ${getYear(Date.now())} Twitter, Inc.`}
                                </Typography>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};
