import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useChangeGenderStyles} from "./ChangeGenderStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {setUserLoadingStatus, updateGender} from "../../../../../store/ducks/user/actionCreators";
import {selectUserIsLoading, selectUserProfileGender} from "../../../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";
import {LoadingStatus} from "../../../../../store/types/common";

const ChangeGender: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChangeGenderStyles();
    const dispatch = useDispatch();
    const gender = useSelector(selectUserProfileGender);
    const isLoading = useSelector(selectUserIsLoading);
    const [selectedGender, setSelectedGender] = useState<string>("Nữ");
    const [otherGender, setOtherGender] = useState<string>("");

    useEffect(() => {
        if (gender) {
            if (gender === "Nữ" || gender === "Nam") {
                setSelectedGender(gender);
            } else {
                setOtherGender(gender ?? "");
            }
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const handleSelectedGender = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedGender(event.target.value);
    };

    const handleChangeGender = (event: ChangeEvent<HTMLInputElement>): void => {
        setOtherGender(event.target.value);
    };

    const onSubmit = (): void => {
        if (selectedGender === "Other") {
            dispatch(updateGender({gender: otherGender}));
        } else {
            dispatch(updateGender({gender: selectedGender}));
        }
    };

    return (
        <>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                If you haven’t already specified a gender, this is the one associated with your account based on
                your profile and activity. This information won’t be displayed publicly.
            </Typography>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Nữ
                    </Typography>
                    <Radio
                        checked={selectedGender === "Nữ"}
                        onChange={handleSelectedGender}
                        value="Nữ"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Nữ"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Nam
                    </Typography>
                    <Radio
                        checked={selectedGender === "Nam"}
                        onChange={handleSelectedGender}
                        value="Nam"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Nam"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Other
                    </Typography>
                    <Radio
                        checked={selectedGender === "Other"}
                        onChange={handleSelectedGender}
                        value="Other"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Other"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                {(selectedGender === "Other") && (
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            onChange={handleChangeGender}
                            label="Giới tính"
                            type="text"
                            variant="filled"
                            value={otherGender}
                            fullWidth
                        />
                    </div>
                )}
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

export default withDocumentTitle(ChangeGender)("Đổi giới tính");
