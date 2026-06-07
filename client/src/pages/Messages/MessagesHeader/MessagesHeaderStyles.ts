import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesHeaderStyles = makeStyles((theme: Theme) => ({
    header: {
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
}));
