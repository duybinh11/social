import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const PeopleSearchInput = withStyles((theme: Theme) => ({
    root: {
        width: "100%",
        '& .MuiOutlinedInput-root': {
            borderRadius: 999,
            border: `1px solid ${theme.palette.divider}`,
            padding: 0,
            paddingLeft: 12,
            width: "100%",
            backgroundColor: theme.palette.action.hover,
            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': { borderColor: 'transparent' },
            },
            '& fieldset': {
                borderColor: 'transparent',
                borderWidth: 1,
            },
            "& .MuiInputAdornment-root": {
                marginRight: 4,
                "& svg": {
                    color: theme.palette.text.secondary,
                    height: "1.2em",
                }
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: "10px 12px 10px 0",
            fontSize: 15,
        },
    },
}))(TextField);
