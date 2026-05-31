import {makeStyles, Theme} from "@material-ui/core";
import {LocationState} from "./Settings";

interface SettingsStylesProps {
    location: LocationState,
}

export const useSettingsStyles = makeStyles<Theme, SettingsStylesProps>((theme) => ({
    settingsLayout: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        paddingTop: 12,
    },
    settingsNavColumn: {
        width: 416,
        flexShrink: 0,
    },
    settingsDetailColumn: {
        width: 599,
        flexShrink: 0,
        minWidth: 0,
    },
    container: {
        padding: 0,
        borderRadius: 0,
        minHeight: props => props.location.pathname.includes("privacy_and_safety") ? 1300 : "100vh",
        borderTop: 0,
        borderBottom: 0,
    },
    leftSideHeader: {
        width: "100%",
        position: "relative",
        top: "auto",
        zIndex: 1,
    },
    rightSideHeader: {
        width: "100%",
        position: "relative",
        top: "auto",
        zIndex: 1,
        '& .MuiTypography-h5': {
            marginLeft: 15,
        },
    },
    detailContent: {
        paddingTop: 0,
    },
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "14px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main,
            },
            "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            "& svg": {
                marginRight: "-2px"
            },
        },
        "& svg": {
            marginLeft: "auto",
        },
    },
    pageContainer: {
        minWidth: 600,
        padding: 0,
        borderLeft: 0,
    },
}));
