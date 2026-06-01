import React, {memo, ReactElement} from "react";
import {Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useMessageSettingsStyles} from "./MessageSettingsStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {useGlobalStyles} from "../../../util/globalClasses";

const MessageSettings = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useMessageSettingsStyles();

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)} variant="outlined">
                <BackButton/>
                <Typography variant="h5">
                    Tin nhắn trực tiếp
                </Typography>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <Typography variant="body1" color="textSecondary">
                    Cài đặt tin nhắn trực tiếp hiện không khả dụng.
                </Typography>
            </div>
        </Paper>
    );
});

export default MessageSettings;
