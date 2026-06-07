import {makeStyles, Theme} from "@material-ui/core";

export const useEmptyChatMessagesStyles = makeStyles((theme: Theme) => ({
    chatInfoWrapper: {
        maxWidth: 360,
        textAlign: "center",
    },
    title: {
        fontWeight: 800,
        marginBottom: 8,
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginBottom: 8,
    },
    chatInfoButton: {
        marginTop: 24,
        height: 52,
        borderRadius: 999,
        paddingLeft: 24,
        paddingRight: 24,
        fontWeight: 700,
    },
}));
