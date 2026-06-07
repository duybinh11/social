import React, {ReactElement} from "react";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useChatUserBlockedStyles} from "./ChatUserBlockedStyles";
import {DIRECT_MESSAGES} from "../../../../util/url";

const ChatUserBlocked = (): ReactElement => {
    const classes = useChatUserBlockedStyles();

    return (
        <Typography variant={"subtitle2"} component={"div"} className={classes.blockedInfoText}>
            Bạn không thể gửi tin nhắn cho người này nữa.
            {" "}
            <MuiLink href={DIRECT_MESSAGES} variant="subtitle2" target="_blank" rel="noopener">
                Tìm hiểu thêm
            </MuiLink>
        </Typography>
    );
};

export default ChatUserBlocked;
