import React, {memo, ReactElement} from "react";
import {Link as MuiLink} from "@material-ui/core";

import {useTweetDeletedStyles} from "./TweetDeletedStyles";
import {TWITTER_NOTICES} from "../../util/url";

const TweetDeleted = memo((): ReactElement => {
    const classes = useTweetDeletedStyles();

    return (
        <div className={classes.container}>
            Tweet này đã bị xóa bởi tác giả.{" "}
            <MuiLink href={TWITTER_NOTICES} target="_blank" rel="noopener">
                Tìm hiểu thêm
            </MuiLink>
        </div>
    );
});

export default TweetDeleted;
