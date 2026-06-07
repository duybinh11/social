import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {SOMEONE_BLOCKED_ME_ON_TWITTER} from "../../../util/url";
import {selectUserProfileUsername} from "../../../store/ducks/userProfile/selectors";
import {useUserPageStyles} from "../UserPageStyles";

const UserBlockedMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const username = useSelector(selectUserProfileUsername);

    return (
        <div className={classes.privateProfileInfo}>
            <Typography variant={"h4"} component={"div"}>
                Bạn đã bị chặn
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {`Bạn không thể theo dõi hoặc xem tweet của @${username}.`}
                <MuiLink href={SOMEONE_BLOCKED_ME_ON_TWITTER} variant="subtitle1" target="_blank" rel="noopener">
                    Tìm hiểu thêm
                </MuiLink>
            </Typography>
        </div>
    );
});

export default UserBlockedMessage;
