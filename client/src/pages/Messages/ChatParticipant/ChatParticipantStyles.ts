import {makeStyles, Theme} from "@material-ui/core";

export const useChatParticipantStyles = makeStyles((theme: Theme) => ({
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    userWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        cursor: "pointer",
    },
    userAvatar: {
        width: 48,
        height: 48,
        marginRight: 12,
        flexShrink: 0,
    },
    userInfo: {
        minWidth: 0,
        flex: 1,
    },
    userName: {
        display: "block",
        fontWeight: 700,
        fontSize: 15,
        lineHeight: "20px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    username: {
        display: "block",
        marginTop: 2,
        color: theme.palette.text.secondary,
        fontSize: 14,
        lineHeight: "18px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
}));
