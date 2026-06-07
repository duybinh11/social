import {makeStyles, Theme} from "@material-ui/core";

export const useChatHeaderStyles = makeStyles((theme: Theme) => ({
    chatHeader: {
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    chatAvatar: {
        width: 40,
        height: 40,
        margin: "0px 12px",
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
}));
