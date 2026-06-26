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
                            "Xóa bài viết?"
                        ) : (
                            isTweetPinned ? (
                                "Bỏ ghim bài viết khỏi hồ sơ?"
                            ) : (
                                "Ghim bài viết lên hồ sơ?"
                            )
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(modalTitle === "Xóa") ? (
                            "Không thể hoàn tác và bài viết sẽ bị xóa khỏi hồ sơ, " +
                            "dòng thời gian của người theo dõi bạn và kết quả tìm kiếm."
                        ) : (
                            isTweetPinned ? (
                                "Bài viết sẽ không còn tự động hiện ở đầu hồ sơ của bạn."
                            ) : (
                                "Bài viết sẽ hiện ở đầu hồ sơ và thay thế bài viết đã ghim trước đó."
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
