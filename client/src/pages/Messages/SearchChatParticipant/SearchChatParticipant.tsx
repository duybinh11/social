import React, {FC, memo, ReactElement} from "react";
import {InputAdornment, makeStyles, Theme} from "@material-ui/core";

import {NewMessageIcon, SearchIcon} from "../../../icons";
import {PeopleSearchInput} from "../PeopleSearchInput/PeopleSearchInput";
import ActionIcon from "../ActionIcon/ActionIcon";

const useSearchChatParticipantStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    searchInput: {
        flex: 1,
        minWidth: 0,
    },
    newMessageIcon: {
        flexShrink: 0,
        "& .MuiIconButton-root": {
            padding: 8,
        },
        "& svg": {
            width: 22,
            height: 22,
            color: theme.palette.primary.main,
        },
    },
}));

interface SearchChatParticipantProps {
    value: string;
    onChange: (value: string) => void;
    onNewMessageClick?: () => void;
}

const SearchChatParticipant: FC<SearchChatParticipantProps> = memo(({value, onChange, onNewMessageClick}): ReactElement => {
    const classes = useSearchChatParticipantStyles();

    return (
        <div className={classes.container}>
            <PeopleSearchInput
                className={classes.searchInput}
                placeholder="Tìm kiếm người và nhóm"
                variant="outlined"
                onChange={(event) => onChange(event.target.value)}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {SearchIcon}
                        </InputAdornment>
                    ),
                }}
            />
            {onNewMessageClick && (
                <div className={classes.newMessageIcon}>
                    <ActionIcon
                        onClick={onNewMessageClick}
                        actionText="Tin nhắn mới"
                        className="icon"
                        icon={NewMessageIcon}
                    />
                </div>
            )}
        </div>
    );
});

export default SearchChatParticipant;
