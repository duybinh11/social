import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const MessageInput = withStyles((theme: Theme) => ({
    root: {
        width: "100%",
        '& .MuiOutlinedInput-root': {
            borderRadius: 22,
            padding: "8px 14px",
            border: `1px solid ${theme.palette.divider}`,
            width: "100%",
            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
            },
            '&:hover': {
                '& fieldset': { borderColor: 'transparent' },
            },
            '& fieldset': {
                borderColor: 'transparent',
                borderWidth: 1,
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: 0,
            fontSize: 15,
            "&::placeholder": {
                color: theme.palette.text.secondary,
                opacity: 1,
            },
        },
    },
}))(TextField);
