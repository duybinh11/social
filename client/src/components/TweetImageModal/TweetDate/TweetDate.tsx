import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import viLang from "date-fns/locale/vi/index";

import {selectTweetDateTime} from "../../../store/ducks/tweet/selectors";

const TweetDate = memo((): ReactElement => {
    const dateTime = useSelector(selectTweetDateTime);

    return (
        <Typography style={{marginBottom: 16}}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), "HH:mm", {locale: viLang})} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), " d MMM yyyy", {locale: viLang})}
            </Typography>
        </Typography>
    );
});

export default TweetDate;
