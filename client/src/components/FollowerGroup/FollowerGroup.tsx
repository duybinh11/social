import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {AvatarGroup} from "@material-ui/lab";
import {Avatar, Typography} from "@material-ui/core";

import {useFollowerGroupStyles} from "./FollowerGroupStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserDataId} from "../../store/ducks/user/selectors";
import {SameFollowerResponse} from "../../store/types/common";
import {USER_FOLLOWERS_YOU_FOLLOW} from "../../util/pathConstants";

interface FollowerGroupProps {
    userId: number,
    sameFollowers?: SameFollowerResponse[],
}

const FollowerGroup: FC<FollowerGroupProps> = ({userId, sameFollowers}): ReactElement => {
    const classes = useFollowerGroupStyles();
    const myProfileId = useSelector(selectUserDataId);

    return (
        <>
            {(userId !== myProfileId) && (
                (sameFollowers?.length !== 0) ? (
                    <div className={classes.followedTextInfoWrapper}>
                        <Link to={`${USER_FOLLOWERS_YOU_FOLLOW}/${userId}`}>
                            <AvatarGroup>
                                {sameFollowers?.slice(0, 3).map(follower => (
                                    <Avatar
                                        key={follower.id}
                                        alt={follower.username}
                                        src={follower.avatar ? follower.avatar.src : DEFAULT_PROFILE_IMG}
                                    />
                                ))}
                            </AvatarGroup>
                            <Typography variant={"subtitle2"} component={"span"} className={classes.followedTextInfo}>
                                {"Được theo dõi bởi "}
                                {sameFollowers?.slice(0, 2).map((follower, index, array) => (
                                    `${follower.username}${(array.length !== index + 1) ? "," : ""} `
                                ))}
                                {(sameFollowers?.length! > 2) && `và ${sameFollowers?.length! - 2} người bạn theo dõi khác`}
                            </Typography>
                        </Link>
                    </div>
                ) : (
                    (userId !== myProfileId) && (
                        <Typography variant={"subtitle2"} component={"div"} className={classes.noFollowedTextInfo}>
                            Không được theo dõi bởi ai bạn đang theo dõi
                        </Typography>
                    )
                )
            )}
        </>
    );
};

export default FollowerGroup;
