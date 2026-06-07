import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";

import {useEmptyNotificationsStyles} from "./EmptyNotificationsStyles";

interface EmptyNotificationsProps {
    isNotification: boolean;
}

const EmptyNotifications: FC<EmptyNotificationsProps> = ({isNotification}): ReactElement => {
    const classes = useEmptyNotificationsStyles();
    
    return (
        <div className={classes.infoWindow}>
            <Typography variant={"h4"} component={"div"}>
                Chưa có gì để xem
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {isNotification ? (
                    "Từ lượt thích đến đăng lại và nhiều hơn nữa, đây là nơi mọi hoạt động diễn ra."
                ) : (
                    "Khi ai đó nhắc đến bạn, bạn sẽ thấy ở đây."
                )}
            </Typography>
        </div>
    );
};

export default EmptyNotifications;
