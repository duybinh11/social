import React, {FC, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Checkbox, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useCreateListsModalStyles} from "./CreateListsModalStyles";
import UploadProfileImage from "../../../../components/EditProfileModal/UploadProfileImage";
import {ImageObj} from "../../../../components/AddTweetForm/AddTweetForm";
import {uploadImage} from "../../../../util/uploadImage";
import {Image} from "../../../../store/types/common";
import CreateListsModalInput from "./CreateListsModalInput/CreateListsModalInput";
import {createList} from "../../../../store/ducks/lists/actionCreators";
import {wallpapers} from "../../../../util/wallpapers";
import CloseButton from "../../../../components/CloseButton/CloseButton";

interface CreateListsModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface CreateListsModalFormProps {
    name: string;
    description: string;
    isPrivate: boolean;
    wallpaper: Image;
}

const CreateListsModalFormSchema = yup.object().shape({
    name: yup.string().min(1, "Tên danh sách không được để trống").required(),
});

const CreateListsModal: FC<CreateListsModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useCreateListsModalStyles();
    const dispatch = useDispatch();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const {control, watch, handleSubmit, formState: {errors}} = useForm<CreateListsModalFormProps>({
        resolver: yupResolver(CreateListsModalFormSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: CreateListsModalFormProps): Promise<void> => {
        const altWallpaper = Math.floor(Math.random() * wallpapers.length);
        let wallpaperResponse: Image | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(createList({
            ...data,
            altWallpaper: wallpapers[altWallpaper],
            wallpaper: wallpaperResponse
        }));
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    <CloseButton onClose={onClose}/>
                    Tạo danh sách mới
                    <Button
                        className={classes.button}
                        disabled={!watch("name")}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Tiếp
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img className={classes.wallpaperImg} key={wallpaper?.src} src={wallpaper?.src}/>
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper}/>
                            </div>
                        </div>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <CreateListsModalInput
                                    label={"Tên"}
                                    name={"name"}
                                    helperText={errors.name?.message}
                                    error={!!errors.name}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={25}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <CreateListsModalInput
                                    label={"Mô tả"}
                                    name={"description"}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={50}
                                />
                            )}
                        />
                        <div className={classes.footer}>
                            <div className={classes.footerWrapper}>
                                <Typography variant={"body1"} component={"div"}>
                                    Đặt riêng tư
                                </Typography>
                                <Controller
                                    name="isPrivate"
                                    control={control}
                                    defaultValue={false}
                                    render={({field: {onChange, value}}) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                            name="private"
                                            color="primary"
                                        />
                                    )}
                                />
                            </div>
                            <Typography variant={"subtitle2"} component={"div"}>
                                Khi đặt danh sách riêng tư, chỉ bạn mới xem được.
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateListsModal;
