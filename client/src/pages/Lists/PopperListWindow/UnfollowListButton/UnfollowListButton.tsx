import React, {memo, ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";

import {usePopperListWindowStyles} from "../PopperListWindowStyles";
import {unfollowList} from "../../../../store/ducks/lists/actionCreators";
import {selectListDetailItemId} from "../../../../store/ducks/listDetail/selectors";

const UnfollowListButton = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const dispatch = useDispatch();
    const listId = useSelector(selectListDetailItemId);
    const [btnText, setBtnText] = useState<string>("Đang theo dõi");

    const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(unfollowList(listId!));
    };

    return (
        <Button
            className={classes.primaryButton}
            onMouseOver={() => setBtnText("Bỏ theo dõi")}
            onMouseLeave={() => setBtnText("Đang theo dõi")}
            onClick={handleUnfollow}
            variant="contained"
            color="primary"
            size="small"
        >
            {btnText}
        </Button>
    );
});

export default UnfollowListButton;
