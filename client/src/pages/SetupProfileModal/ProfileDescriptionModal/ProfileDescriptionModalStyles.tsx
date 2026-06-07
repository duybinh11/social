import {makeStyles} from "@material-ui/core";

export const useProfileDescriptionModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
        "& .MuiTypography-h3": {
            margin: "16px 0",
        },
        "& .MuiTypography-subtitle1": {
            marginBottom: 30,
        },
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& img": {
            height: 34,
            width: 34,
        },
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 530,
        marginBottom: 30,
    },
}));
