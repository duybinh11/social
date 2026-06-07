import {makeStyles, Theme} from "@material-ui/core";

export const useChatFooterStyles = makeStyles((theme: Theme) => ({
    chatFooter: {
        display: "flex",
        alignItems: "flex-end",
        gap: 4,
        width: "100%",
        padding: "10px 12px 12px",
        borderTop: `1px solid ${theme.palette.divider}`,
        borderRight: 0,
        borderLeft: 0,
        borderBottom: 0,
        borderRadius: 0,
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
    },
    inputWrapper: {
        flex: 1,
        minWidth: 0,
    },
    chatIcon: {
        flexShrink: 0,
        "& .MuiIconButton-root": {
            width: 34,
            height: 34,
            padding: 6,
            "& svg": {
                height: "1.1em",
            }
        },
    },
    emojiIcon: {
        flexShrink: 0,
        "& .MuiIconButton-root": {
            width: 34,
            height: 34,
            padding: 6,
            "& svg": {
                height: "1.1em",
            }
        },
    },
    sendWrapper: {
        flexShrink: 0,
        marginLeft: 2,
    },
}));
