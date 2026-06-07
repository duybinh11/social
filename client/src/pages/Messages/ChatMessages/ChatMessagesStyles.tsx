import {makeStyles, Theme} from "@material-ui/core";

export const useChatMessagesStyles = makeStyles((theme: Theme) => ({
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minHeight: "100vh",
        padding: 0,
        borderLeft: 0,
        borderRadius: 0,
        overflow: "hidden",
    },
    emptyWrapper: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    chatBody: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        paddingTop: 53,
        overflow: "hidden",
    },
    chat: {
        flex: 1,
        overflowY: "auto",
        padding: "16px 20px",
        border: 0,
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
    },
}));
