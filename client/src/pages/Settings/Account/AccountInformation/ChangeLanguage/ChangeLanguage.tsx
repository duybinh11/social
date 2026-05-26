import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, FormControl, InputLabel, Typography} from "@material-ui/core";

import {useChangeLanguageStyles} from "./ChangeLanguageStyles";
import {FilledSelect} from "../../../../../components/FilledSelect/FilledSelect";
import {selectUserIsLoading, selectUserProfileLanguage} from "../../../../../store/ducks/user/selectors";
import {setUserLoadingStatus, updateLanguage} from "../../../../../store/ducks/user/actionCreators";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";
import {LoadingStatus} from "../../../../../store/types/common";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();
    const dispatch = useDispatch();
    const myProfileLanguage = useSelector(selectUserProfileLanguage);
    const isLoading = useSelector(selectUserIsLoading);
    const [language, setLanguage] = useState<string>("Tiếng Việt");

    useEffect(() => {
        if (myProfileLanguage) {
            setLanguage(myProfileLanguage);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const changeLanguage = (event: ChangeEvent<{ value: unknown }>): void => {
        setLanguage(event.target.value as string);
    };

    const onSubmit = (): void => {
        dispatch(updateLanguage({language}));
    };

    return (
        <>
            <div className={classes.selectWrapper}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="select-language">
                        Ngôn ngữ hiển thị
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        labelId="select-language"
                        id="select-language"
                        native
                        value={language}
                        onChange={changeLanguage}
                        label="Ngôn ngữ hiển thị"
                        fullWidth
                    >
                        <option aria-label="None"/>
                        {languages()}
                    </FilledSelect>
                </FormControl>
                <Typography variant={"subtitle2"} component={"div"} className={classes.languageInfo}>
                    Chọn ngôn ngữ ưa thích cho tiêu đề, nút bấm và văn bản khác trên tài khoản này.
                    Điều này không thay đổi ngôn ngữ nội dung trên dòng thời gian của bạn.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={onSubmit}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Lưu
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeLanguage)("Đổi ngôn ngữ hiển thị");

const languages = (): JSX.Element => (
    <option value="Tiếng Việt">Tiếng Việt</option>
);
