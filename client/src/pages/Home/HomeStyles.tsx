import {makeStyles, Theme} from "@material-ui/core";

export const useHomeStyles = makeStyles((theme: Theme) => ({
    header: {
        '& .MuiTypography-h5': {
            marginLeft: 16,
        },
    },
    addForm: {
        padding: "72px 20px 0px 20px",
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider,
    },
}));
