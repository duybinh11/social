import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const ContentYouSee: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Quyết định nội dung bạn thấy trên Twitter dựa trên sở thích và mối quan tâm của bạn
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Display media that may contain sensitive content
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Chủ đề
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Interests
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Explore settings
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Search settings
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(ContentYouSee)("Nội dung bạn thấy");
