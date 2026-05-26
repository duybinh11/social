import {makeStyles, Theme} from "@material-ui/core";

const LEFT_RAIL_WIDTH = 275;
const MAIN_COLUMN_WIDTH = 600;
const RIGHT_RAIL_WIDTH = 350;

export const useLayoutStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    pageLayout: {
        display: "flex",
        width: "100%",
        maxWidth: LEFT_RAIL_WIDTH + MAIN_COLUMN_WIDTH + RIGHT_RAIL_WIDTH + 48,
        minHeight: "100vh",
        "@media (max-width: 1280px)": {
            maxWidth: "100%",
            paddingLeft: 16,
            paddingRight: 16,
        },
    },
    leftRail: {
        width: LEFT_RAIL_WIDTH,
        flexShrink: 0,
    },
    mainColumn: {
        width: MAIN_COLUMN_WIDTH,
        flexShrink: 0,
        minWidth: 0,
    },
    mainColumnFull: {
        flex: 1,
        maxWidth: MAIN_COLUMN_WIDTH + RIGHT_RAIL_WIDTH + 24,
        minWidth: 0,
    },
    rightRail: {
        width: RIGHT_RAIL_WIDTH,
        flexShrink: 0,
        marginLeft: 24,
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        maxHeight: "100vh",
        overflowY: "auto",
    },
    footer: {
        padding: "16px 16px",
        "& .MuiTypography-root": {
            paddingRight: 12,
            lineHeight: "16px",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 400,
            color: theme.palette.text.secondary,
            "&:hover": {
                textDecoration: "underline",
            },
        },
        "& svg": {
            verticalAlign: "unset",
            color: theme.palette.text.secondary,
            height: "0.8em",
        },
        "& a": {
            textDecoration: "none",
        },
    },
}));
