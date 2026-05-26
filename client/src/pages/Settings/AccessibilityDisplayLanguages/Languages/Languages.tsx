import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";

import {useLanguagesStyles} from "./LanguagesStyles";
import {ArrowRightIcon} from "../../../../icons";
import {selectUserProfileLanguage} from "../../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../../util/globalClasses";
import classnames from "classnames";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";
import {SETTINGS_INFO_LANGUAGES} from "../../../../util/pathConstants";

const Languages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useLanguagesStyles();
    const myProfileLanguage = useSelector(selectUserProfileLanguage);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Quản lý ngôn ngữ dùng để cá nhân hóa trải nghiệm Twitter của bạn.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Ngôn ngữ hiển thị
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Chọn ngôn ngữ ưa thích cho tiêu đề, nút bấm và văn bản khác trên Twitter.
                </Typography>
            </div>
            <Link to={SETTINGS_INFO_LANGUAGES} className={globalClasses.linkWrapper}>
                <div className={classnames(globalClasses.contentLink, classes.accessibilityWrapper)}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant={"body1"} component={"div"}>
                            Ngôn ngữ hiển thị
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {myProfileLanguage}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Chọn thêm ngôn ngữ
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Chọn thêm ngôn ngữ cho nội dung bạn muốn xem trên Twitter.
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Ngôn ngữ bổ sung bạn biết
                </Typography>
                {ArrowRightIcon}
            </div>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Ngôn ngữ bạn có thể biết
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Quản lý ngôn ngữ Twitter suy luận từ hoạt động của bạn, như tài khoản bạn theo dõi và các tweet bạn tương tác.
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Ngôn ngữ bạn có thể biết
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(Languages)("Ngôn ngữ");
