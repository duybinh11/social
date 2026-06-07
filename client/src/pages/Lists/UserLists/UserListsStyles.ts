import {makeStyles, Theme} from "@material-ui/core";

export const useUserListsStyles = makeStyles((theme: Theme) => ({
    myLists: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    emptyState: {
        padding: "32px 16px",
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));
