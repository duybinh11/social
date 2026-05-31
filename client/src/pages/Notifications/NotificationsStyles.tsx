import {makeStyles, Theme} from "@material-ui/core";

export const useNotificationsStyles = makeStyles((theme: Theme) => ({
    container: {
        "& a": {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
    },
    header: {
        border: 0,
    },
}));
