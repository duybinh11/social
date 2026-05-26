import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {PUBLIC_AND_PROTECTED_TWEETS} from "../../../util/url";
import {selectUserProfileUsername} from "../../../store/ducks/userProfile/selectors";
import {useUserPageStyles} from "../UserPageStyles";

const UserPrivateProfileMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const username = useSelector(selectUserProfileUsername);

    return (
        <div className={classes.privateProfileInfo}>
            <Typography variant={"h4"} component={"div"}>
                Các tweet này được bảo vệ
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {`Only approved followers can see @${username}’s Tweets. To request access, click Follow. `}
                <MuiLink href={PUBLIC_AND_PROTECTED_TWEETS} variant="subtitle1" target="_blank" rel="noopener">
                    Tìm hiểu thêm
                </MuiLink>
            </Typography>
        </div>
    );
});

export default UserPrivateProfileMessage;
