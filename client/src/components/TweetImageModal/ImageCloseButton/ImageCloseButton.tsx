import React, {FC, memo, ReactElement} from "react";
import {IconButton, makeStyles} from "@material-ui/core";

import {CloseIcon} from "../../../icons";

const useImageCloseButtonStyles = makeStyles((theme) => ({
    imageModalClose: {
        margin: 10,
        "& svg": {
            height: "0.9em",
            color: theme.palette.common.white
        },
    },
}));

interface ImageCloseButtonProps {
    onCloseModalWindow: () => void;
}

const ImageCloseButton: FC<ImageCloseButtonProps> = memo(({onCloseModalWindow}): ReactElement => {
    const classes = useImageCloseButtonStyles();

    return (
        <div className={classes.imageModalClose}>
            <IconButton id={"closeModalWindow"} onClick={onCloseModalWindow} size="small">
                {CloseIcon}
            </IconButton>
        </div>
    );
});

export default ImageCloseButton;
