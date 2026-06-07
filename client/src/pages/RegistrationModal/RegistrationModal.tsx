import React, {ChangeEvent, FC, ReactElement, ReactNode, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {Button, Dialog, FormControl, InputLabel, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import VkuLogo from "../../components/VkuLogo/VkuLogo";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useRegistrationModalStyles} from "./RegistrationModalStyles";
import RegistrationInput from "./RegistrationInput/RegistrationInput";
import {RegistrationInfo} from "../Authentication/Authentication";
import {AuthApi} from "../../services/api/authApi";
import {FilledSelect} from "../../components/FilledSelect/FilledSelect";

interface RegistrationModalProps {
    open: boolean;
    onClose: () => void;
    onOpenCustomize: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    onChangeRegistrationInfo: (data: RegistrationInfo) => void;
}

interface RegistrationFormProps {
    username: string;
    email: string;
}

const RegistrationFormSchema = yup.object().shape({
    username: yup.string().min(1, "Tên của bạn là gì?").required(),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập địa chỉ email hợp lệ."),
});

const RegistrationModal: FC<RegistrationModalProps> = (
    {
        open,
        onClose,
        onOpenCustomize,
        onChangeRegistrationInfo
    }
): ReactElement => {
    const classes = useRegistrationModalStyles();
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const {control, handleSubmit, setError, formState: {errors}} = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = (data: RegistrationFormProps): void => {
        let birthday = "";

        if (month !== "" && day !== 0 && year !== 0) {
            birthday = month + " " + day + ", " + year;
        }
        const registrationData: RegistrationInfo = {username: data.username, email: data.email, birthday: birthday};
        AuthApi.checkEmail(registrationData)
            .then(() => {
                onChangeRegistrationInfo(registrationData);
                onOpenCustomize(true);
            })
            .catch((error) => {
                const errors = error.response.data;

                if (errors.username) {
                    setError("username", {type: "server", message: errors.username});
                }
                if (errors.email) {
                    setError("email", {type: "server", message: errors.email});
                }
            });
    };

    const changeMonth = (event: ChangeEvent<{ value: unknown }>): void => {
        setMonth(event.target.value as string);
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        setDay(event.target.value as number);
    };

    const changeYear = (event: ChangeEvent<{ value: unknown }>): void => {
        setYear(event.target.value as number);
    };

    const showDays = (): ReactNode[] => {
        let days = [];

        for (let i = 1; i <= 31; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    };

    const showYears = (): ReactNode[] => {
        let years = [];

        for (let i = 2021; i >= 1901; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

    return (
        <Dialog
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{paddingTop: 0, paddingBottom: 0}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <VkuLogo height={28} width={28}/>
                </div>
                <div>
                    <Typography variant={"h3"} component={"div"} className={classes.title}>
                        Tạo tài khoản của bạn
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl className={classes.inputWrapper} variant="outlined">
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}}) => (
                                    <RegistrationInput
                                        name="username"
                                        helperText={errors.username?.message}
                                        error={!!errors.username}
                                        label={"Tên"}
                                        maxTextLength={50}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}}) => (
                                    <RegistrationInput
                                        name="email"
                                        helperText={errors.email?.message}
                                        error={!!errors.email}
                                        label={"Email"}
                                        maxTextLength={50}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </FormControl>
                        <div className={classes.footer}>
                            <Typography variant={"h6"} component={"div"}>
                                Ngày sinh
                            </Typography>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-month">
                                    Tháng
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{width: 240, marginRight: 12}}
                                    labelId="select-month"
                                    id="select-month"
                                    native
                                    value={month}
                                    onChange={changeMonth}
                                    label="Tháng"
                                >
                                    <option aria-label="None"/>
                                    <option value={"Jan"}>Tháng 1</option>
                                    <option value={"Feb"}>Tháng 2</option>
                                    <option value={"Mar"}>Tháng 3</option>
                                    <option value={"Apr"}>Tháng 4</option>
                                    <option value={"Tháng 5"}>Tháng 5</option>
                                    <option value={"Jun"}>Tháng 6</option>
                                    <option value={"Jul"}>Tháng 7</option>
                                    <option value={"Aug"}>Tháng 8</option>
                                    <option value={"Sep"}>Tháng 9</option>
                                    <option value={"Oct"}>Tháng 10</option>
                                    <option value={"Nov"}>Tháng 11</option>
                                    <option value={"Dec"}>Tháng 12</option>
                                </FilledSelect>
                            </FormControl>
                            <FormControl style={{margin: "16px 0"}} variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-day">
                                    Ngày
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{width: 100, marginRight: 12}}
                                    labelId="select-day"
                                    id="select-day"
                                    native
                                    value={day}
                                    onChange={changeDay}
                                    label="Ngày"
                                >
                                    <option aria-label="None"/>
                                    {showDays()}
                                </FilledSelect>
                            </FormControl>
                            <FormControl style={{margin: "16px 0"}} variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-year">
                                    Năm
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{width: 125,}}
                                    labelId="select-year"
                                    id="select-year"
                                    native
                                    value={year}
                                    onChange={changeYear}
                                    label="Năm"
                                >
                                    <option aria-label="None"/>
                                    {showYears()}
                                </FilledSelect>
                            </FormControl>
                        </div>
                        <div className={classes.buttonWrapper}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                fullWidth
                            >
                                Tiếp
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationModal;
