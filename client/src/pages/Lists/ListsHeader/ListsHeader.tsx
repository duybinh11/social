import React, {ReactElement, useState} from "react";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {AddListsIcon} from "../../../icons";
import {useListsHeaderStyles} from "./ListsHeaderStyles";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import {selectIsLoading} from "../../../store/ducks/lists/selectors";
import {selectUserProfileUsername} from "../../../store/ducks/user/selectors";
import CreateListsModal from "./CreateListsModal/CreateListsModal";

const ListsHeader = (): ReactElement => {
    const classes = useListsHeaderStyles();
    const isLoading = useSelector(selectIsLoading);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const [visibleCreateListModal, setVisibleCreateListModal] = useState<boolean>(false);

    const onOpenCreateListModal = (): void => {
        setVisibleCreateListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleCreateListModal(false);
    };

    return (
        <PageHeaderWrapper backButton>
            {!isLoading && (
                <div>
                    <Typography variant="h5" component={"div"}>
                        Danh sách
                    </Typography>
                    <Typography variant="subtitle2" component={"div"}>
                        @{myProfileUsername}
                    </Typography>
                </div>
            )}
            <div className={classes.iconGroup}>
                <ActionIconButton onClick={onOpenCreateListModal} actionText={"Create"} icon={AddListsIcon}/>
            </div>
            <CreateListsModal visible={visibleCreateListModal} onClose={onCloseCreateListModal}/>
        </PageHeaderWrapper>
    );
};

export default ListsHeader;
