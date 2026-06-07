import React, {memo, ReactElement} from "react";
import classnames from "classnames";
import {Paper, Typography} from "@material-ui/core";

import {MESSAGES_SETTINGS} from "../../../util/pathConstants";
import {NewMessageIcon, SettingsIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {useMessagesHeaderStyles} from "./MessagesHeaderStyles";
import ActionIcon from "../ActionIcon/ActionIcon";

interface MessagesHeaderProps {
    onNewMessageClick?: () => void;
}

const MessagesHeader = memo(({onNewMessageClick}: MessagesHeaderProps): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useMessagesHeaderStyles();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
            <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                Tin nhắn
            </Typography>
            <div className={classes.iconGroup}>
                <ActionIcon
                    path={MESSAGES_SETTINGS}
                    actionText={"Cài đặt"}
                    className={"icon"}
                    icon={SettingsIcon}
                />
                <ActionIcon
                    onClick={onNewMessageClick}
                    actionText={"Tin nhắn mới"}
                    className={"icon"}
                    icon={NewMessageIcon}
                />
            </div>
        </Paper>
    );
});

export default MessagesHeader;
