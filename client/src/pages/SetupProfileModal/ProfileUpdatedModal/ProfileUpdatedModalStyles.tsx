import {makeStyles} from "@material-ui/core";

export const useProfileUpdatedModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
    },
    logoIcon: {
        margin: "180px auto 80px auto",
        width: 54,
        "& img": {
            height: 50,
            width: 50,
        },
    },
    title: {
        width: 250,
        margin: "0px auto",
    },
    buttonWrapper: {
        width: 250,
        margin: "80px auto 0px auto",
    },
    button: {
        width: 250,
        height: 52,
    },
}));
