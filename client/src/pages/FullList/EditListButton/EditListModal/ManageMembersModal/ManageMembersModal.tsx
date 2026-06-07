import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle, InputAdornment, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {useManageMembersModalStyles} from "./ManageMembersModalStyles";
import ManageMembersItem from "./ManageMembersItem/ManageMembersItem";
import {ArrowIcon, ForwardArrowIcon, SearchIcon} from "../../../../../icons";
import {selectListItem} from "../../../../../store/ducks/list/selectors";
import {
    selectIsListMembersLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "../../../../../store/ducks/listMembers/selectors";
import {
    fetchListMembers,
    fetchListMembersByUsername,
    resetListMembersState,
    resetListSuggested
} from "../../../../../store/ducks/listMembers/actionCreators";
import Spinner from "../../../../../components/Spinner/Spinner";
import {ManageMembersInput} from "./ManageMembersInput/ManageMembersInput";
import EmptyPageDescription from "../../../../../components/EmptyPageDescription/EmptyPageDescription";

const ManageMembersModal = (): ReactElement => {
    const classes = useManageMembersModalStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const members = useSelector(selectListMembersItems);
    const suggested = useSelector(selectListSuggestedItems);
    const isMembersLoading = useSelector(selectIsListMembersLoading);
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>("");
    const [visibleManageMembersModal, setVisibleManageMembersModal] = useState<boolean>(false);

    useEffect(() => {
        if (visibleManageMembersModal) {
            dispatch(fetchListMembers({listId: list?.id!, listOwnerId: list?.listOwner.id!}));
        }

        return () => {
            dispatch(resetListMembersState());
            dispatch(resetListSuggested());
        };
    }, [visibleManageMembersModal]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);

        if (newValue === 0) {
            setSearchText("");
            dispatch(resetListSuggested());
            dispatch(fetchListMembers({listId: list?.id!, listOwnerId: list?.listOwner.id!}));
        }
    };

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchListMembersByUsername({listId: list?.id!, username: encodeURIComponent(text)}));
        } else {
            setSearchText("");
            dispatch(resetListSuggested());
        }
    };

    const onOpenManageMembersModal = (): void => {
        setVisibleManageMembersModal(true);
    };

    const onCloseManageMembersModal = (): void => {
        setVisibleManageMembersModal(false);
    };

    return (
        <>
            <Typography
                id={"onOpenManageMembersModal"}
                className={classes.manageMembers}
                onClick={onOpenManageMembersModal}
                variant={"body1"}
                component={"div"}
            >
                Quản lý thành viên
                <>{ForwardArrowIcon}</>
            </Typography>
            <Dialog
                className={classes.dialog}
                open={visibleManageMembersModal}
                onClose={onCloseManageMembersModal}
                hideBackdrop
            >
                <DialogTitle>
                    <IconButton onClick={onCloseManageMembersModal} color="primary" size="small">
                        <>{ArrowIcon}</>
                    </IconButton>
                    Quản lý thành viên
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab className={classes.tab} label={`Thành viên (${list?.membersSize})`}/>
                            <Tab className={classes.tab} label="Gợi ý"/>
                        </Tabs>
                    </div>
                    {(activeTab === 0) ? (
                        isMembersLoading ? (
                            <Spinner/>
                        ) : (
                            (members.length !== 0) ? (
                                members.map((member) => (
                                    <ManageMembersItem
                                        key={member.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={member}
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={"Chưa có ai trong danh sách này"}
                                    subtitle={"Khi có người được thêm, họ sẽ hiện ở đây."}
                                />
                            )
                        )
                    ) : (
                        <div className={classes.container}>
                            <ManageMembersInput
                                fullWidth
                                placeholder="Tìm người"
                                variant="outlined"
                                onChange={(event) => onSearch(event.target.value)}
                                value={searchText}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {SearchIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {(suggested.length !== 0) ? (
                                suggested.map((suggest) => (
                                    <ManageMembersItem
                                        key={suggest.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={suggest}
                                        isSuggested
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={"Chưa có thành viên gợi ý"}
                                    subtitle={"Để xem gợi ý thêm vào danh sách, hãy thử tìm tài khoản."}
                                />
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ManageMembersModal;
