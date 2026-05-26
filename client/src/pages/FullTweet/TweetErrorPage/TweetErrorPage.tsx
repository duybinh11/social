import React, {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

import {useTweetErrorPageStyles} from "./TweetErrorPageStyles";
import {selectErrorMessage} from "../../../store/ducks/tweet/selectors";
import {SEARCH} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";

const TweetErrorPage = (): ReactElement => {
    const classes = useTweetErrorPageStyles();
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(setOpenSnackBar(errorMessage));
    }, []);

    return (
        <>
            <Typography variant={"h5"} component={"div"} className={classes.error}>
                Hmm...this page doesn’t exist. <br/>
                Hãy thử tìm nội dung khác.
            </Typography>
            <Link to={SEARCH} className={globalClasses.link}>
                <Button
                    className={classes.searchButton}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Tìm kiếm
                </Button>
            </Link>
        </>
    );
};

export default TweetErrorPage;
