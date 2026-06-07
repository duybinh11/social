import {makeStyles, Theme} from "@material-ui/core";

export const useStartConversationStyles = makeStyles((theme: Theme) => ({
    messagesTitle: {
        fontWeight: 800,
        marginBottom: 8,
    },
    messagesText: {
        color: theme.palette.text.secondary,
        marginBottom: 24,
        lineHeight: 1.5,
    },
    messagesButton: {
        height: 52,
        borderRadius: 999,
        paddingLeft: 24,
        paddingRight: 24,
        fontWeight: 700,
        alignSelf: "flex-start",
    },
}));
