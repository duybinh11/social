import React, {memo, ReactElement} from "react";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import viLang from "date-fns/locale/vi/index";
import {useSelector} from "react-redux";

import {selectTweetDateTime} from "../../../store/ducks/tweet/selectors";
import {useFullTweetStyles} from "../FullTweetStyles";

const TweetDateTime = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const dateTime = useSelector(selectTweetDateTime);

    return (
        <div className={classes.dateWrapper}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), "HH:mm", {locale: viLang})} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), " d MMM yyyy", {locale: viLang})} · Ứng dụng web Twitter
            </Typography>
        </div>
    );
});

export default TweetDateTime;
