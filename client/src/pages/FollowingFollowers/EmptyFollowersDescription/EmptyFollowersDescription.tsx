import React, {FC, memo, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

import {useEmptyFollowersDescriptionStyles} from "./EmptyFollowersDescriptionStyles";
import {HOME_CONNECT} from "../../../util/pathConstants";
import {useSelector} from "react-redux";
import {selectUserDataId} from "../../../store/ducks/user/selectors";
import {selectUserProfileId, selectUserProfileUsername} from "../../../store/ducks/userProfile/selectors";

interface EmptyFollowersDescriptionProps {
    activeTab: number;
}

const EmptyFollowersDescription: FC<EmptyFollowersDescriptionProps> = memo(({activeTab}): ReactElement => {
    const classes = useEmptyFollowersDescriptionStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isMyProfile = myProfileId === userProfileId;

    return (
        <div className={classes.content}>
            <Typography variant={"h5"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        "Bạn chưa theo dõi ai"
                    ) : (
                        "Bạn chưa có người theo dõi"
                    )
                ) : (
                    (activeTab === 0) ? (
                        `@${username} chưa theo dõi ai`
                    ) : (
                        `@${username} chưa có người theo dõi`
                    )
                )}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        "Khi bạn theo dõi, họ sẽ hiện ở đây và tweet của họ sẽ xuất hiện trên dòng thời gian."
                    ) : (
                        "Khi ai đó theo dõi bạn, bạn sẽ thấy họ ở đây."
                    )
                ) : (
                    (activeTab === 0) ? (
                        "Khi họ theo dõi, họ sẽ hiện ở đây."
                    ) : (
                        "Khi ai đó theo dõi họ, họ sẽ hiện ở đây."
                    )
                )}
            </Typography>
            {(isMyProfile && activeTab === 0) && (
                <Button
                    to={HOME_CONNECT}
                    component={Link}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Tìm người để theo dõi
                </Button>
            )}
        </div>
    );
});

export default EmptyFollowersDescription;
