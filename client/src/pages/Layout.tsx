import React, {FC, ReactElement, ReactNode} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import classnames from "classnames";

import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from '../components/Users/Users';
import {useLayoutStyles} from "./LayoutStyles";
import SideSearch from "../components/SideSearch/SideSearch";
import {DisplayProps} from "../types/display";
import ProfileImages from "../components/ProfileImages/ProfileImages";
import {selectImages} from "../store/ducks/userProfile/selectors";
import {SETTINGS} from "../util/pathConstants";

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
                    </aside>
                )}
            </div>
        </div>
    );
};
