import React, {FC, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";

import {useWelcomeStyles} from "./WelcomeStyles";
import {startUseTwitter} from "../../store/ducks/user/actionCreators";

const Welcome: FC = (): ReactElement => {
    const classes = useWelcomeStyles();
    const dispatch = useDispatch();

    const onHandleClick = (): void => {
        dispatch(startUseTwitter());
    };

    return (
        <div className={classes.info}>
            <Typography variant={"h5"} component={"div"}>
                Chào mừng đến Twitter!
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                Đây là nơi tốt nhất để xem chuyện gì đang diễn ra quanh bạn.
                Hãy tìm vài người và chủ đề để theo dõi ngay.
            </Typography>
            <div className={classes.infoButtonContainer}>
                <Button
                    onClick={onHandleClick}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Bắt đầu thôi
                </Button>
            </div>
        </div>
    );
};

export default Welcome;
