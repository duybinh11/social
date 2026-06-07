import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useTweetComponentActionsModalStyles} from "./TweetComponentActionsModalStyles";

interface TweetComponentActionsModalProps {
    modalTitle: string;
    isTweetPinned?: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onClick: () => void;
}

const TweetComponentActionsModal: FC<TweetComponentActionsModalProps> = (
    {
        modalTitle,
        isTweetPinned,
        visibleTweetComponentActionsModal,
        onCloseTweetComponentActionsModal,
        onClick,
    }
): ReactElement => {
    const classes = useTweetComponentActionsModalStyles({modalTitle});

    return (
        <Dialog open={visibleTweetComponentActionsModal} onClose={onCloseTweetComponentActionsModal}>
            <DialogContent style={{padding: 0}}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"}>
                        {(modalTitle === "Xóa") ? (
                            "Xóa tweet?"
                        ) : (
                            isTweetPinned ? (
                                "Bỏ ghim tweet khỏi hồ sơ?"
                            ) : (
                                "Ghim tweet lên hồ sơ?"
                            )
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(modalTitle === "Xóa") ? (
                            "Không thể hoàn tác và tweet sẽ bị xóa khỏi hồ sơ, " +
                            "dòng thời gian của người theo dõi bạn và kết quả tìm kiếm Twitter."
                        ) : (
                            isTweetPinned ? (
                                "Tweet sẽ không còn tự động hiện ở đầu hồ sơ của bạn."
                            ) : (
                                "Tweet sẽ hiện ở đầu hồ sơ và thay thế tweet đã ghim trước đó."
                            )
                        )}
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            size="large"
                        >
                            Hủy
                        </Button>
                        <Button
                            className={(modalTitle === "Xóa") ? (
                                classes.modalDeleteButton
                            ) : (
                                classes.modalPrimaryButton
                            )}
                            onClick={onClick}
                            variant="contained"
                            size="large"
                        >
                            {(modalTitle === "Xóa") ? (
                                "Xóa"
                            ) : (
                                isTweetPinned ? ("Bỏ ghim") : ("Ghim")
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetComponentActionsModal;
