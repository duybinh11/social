import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesStyles = makeStyles((theme: Theme) => ({
    container: {
        flexWrap: "nowrap",
        width: "100%",
        minHeight: "100vh",
    },
    leftPanel: {
        width: 388,
        maxWidth: 388,
        flexBasis: 388,
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    rightPanel: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
    },
    leftPaper: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minHeight: "100vh",
        borderRadius: 0,
        borderTop: 0,
        borderLeft: 0,
        borderBottom: 0,
        borderRight: 0,
    },
    leftContent: {
        paddingTop: 53,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
    },
    searchWrapper: {
        padding: "12px 16px",
        flexShrink: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    list: {
        flex: 1,
        overflowY: "auto",
        padding: 0,
        "& .MuiListItem-root": {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            borderRight: `3px solid ${theme.palette.primary.main}`,
            "&:hover": {
                backgroundColor: theme.palette.action.selected,
            },
        },
    },
    emptySearch: {
        padding: "32px 24px",
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    emptyState: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px 24px 32px",
    },
}));
