import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import {useNotificationsStyles} from "./NotificationsStyles";
import {useGlobalStyles} from "../../util/globalClasses";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import NotificationsPage from "./NotificationsPage/NotificationsPage";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useNotificationsStyles();

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)}>
                <div className={globalClasses.pageHeaderTitleWrapper}>
                    <Typography variant="h5">
                        Thông báo
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <NotificationsPage/>
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Notifications)("Thông báo");
