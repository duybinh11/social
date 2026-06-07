import React, {memo, ReactElement, useState} from "react";
import {useSelector} from "react-redux";

import {usePopperListWindowStyles} from "../PopperListWindowStyles";
import {selectListDetailItemId, selectListDetailItemOwnerId} from "../../../../store/ducks/listDetail/selectors";
import MembersAndFollowersModal
    from "../../../FullList/FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import MembersCount from "./MembersCount/MembersCount";
import FollowersCount from "./FollowersCount/FollowersCount";

const PopperListInteractionCount = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const listId = useSelector(selectListDetailItemId);
    const listOwnerId = useSelector(selectListDetailItemOwnerId);
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const onOpenMembersModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("Thành viên danh sách");
    };

    const onOpenFollowersModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("Người theo dõi danh sách");
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalWindowTitle("");
    };

    return (
        <div>
            <span
                id={"openMembersModalWindow"}
                className={classes.popperListMembers}
                onClick={onOpenMembersModalWindow}
            >
                <MembersCount/>
            </span>
            <span
                id={"openFollowersModalWindow"}
                className={classes.popperListMembers}
                onClick={onOpenFollowersModalWindow}
            >
                <FollowersCount/>
            </span>
            <MembersAndFollowersModal
                listId={listId!}
                listOwnerId={listOwnerId!}
                visible={visibleMembersAndFollowersModal}
                title={modalWindowTitle}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default PopperListInteractionCount;
