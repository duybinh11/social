import React, {ChangeEvent, FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {EmojiData} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiConvertor from 'emoji-js';

import {
    addPoll,
    addQuoteTweet,
    addTweet,
} from "../../store/ducks/tweets/actionCreators";
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {fetchReplyTweet} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {PullIcon} from "../../icons";
import Poll, {PollInitialState, pollInitialState} from "./Poll/Poll";
import Reply from "./Reply/Reply";
import Quote from "../Quote/Quote";
import {QuoteTweetResponse} from "../../store/types/tweet";
import {Image, ReplyType} from "../../store/types/common";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import {setOpenSnackBar} from "../../store/ducks/actionSnackbar/actionCreators";
import EmojiIconButton from "./EmojiIconButton/EmojiIconButton";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import AddTweetImage from "./AddTweetImage/AddTweetImage";
import {useParams} from "react-router-dom";

export interface AddTweetFormProps {
    quoteTweet?: QuoteTweetResponse;
    maxRows?: number;
    minRows?: number;
    tweetId?: number;
    title: string;
    buttonName: string;
    addressedUsername?: string;
    addressedId?: number;
    onCloseModal?: () => void;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

const AddTweetForm: FC<AddTweetFormProps> = (
    {
        quoteTweet,
        maxRows,
        minRows,
        tweetId,
        title,
        buttonName,
        addressedUsername,
        addressedId,
        onCloseModal
    }
): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const [text, setText] = useState<string>("");
    const [images, setImages] = useState<ImageObj[]>([]);
    const [replyType, setReplyType] = useState<ReplyType>(ReplyType.EVERYONE);
    const [visiblePoll, setVisiblePoll] = useState<boolean>(false);
    const [pollData, setPollData] = useState<PollInitialState>(pollInitialState);
    const classes = useAddTweetFormStyles({quoteTweet: quoteTweet});
    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;

    const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };

    const addEmoji = useCallback((emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = 'unified';
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setText(text + " " + convertedEmoji);
    }, [text]);

    const handleClickAddTweet = async (): Promise<void> => {
        const {day, hour, minute, choice1, choice2, choice3, choice4} = pollData;
        const pollDateTime = (day * 1440) + (hour * 60) + minute;
        const choices = [choice1, choice2, choice3, choice4].filter(item => item);
        const result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        if (visiblePoll) {
            dispatch(addPoll({
                text: textConverter(),
                images: result,
                pollDateTime: pollDateTime,
                choices: choices,
                replyType: replyType
            }));
        } else {
            dispatch(addTweet({
                text: textConverter(),
                images: result,
                replyType: replyType
            }));
        }
        dispatch(setOpenSnackBar("Your tweet was sent."));
        setText('');
        setImages([]);
        setVisiblePoll(false);
    };

    const handleClickQuoteTweet = async (): Promise<void> => {
        let result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(addQuoteTweet({
            text: textConverter(),
            images: result,
            replyType: replyType,
            tweetId: quoteTweet!.id,
            userId: params.userId,
        }));

        dispatch(setOpenSnackBar("Your tweet was sent."));
        setText("");
        setImages([]);

        if (onCloseModal) onCloseModal();
    };

    const handleClickReplyTweet = async (): Promise<void> => {
        let result: Array<Image> = [];

        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchReplyTweet({
            tweetId: tweetId!,
            userId: params.userId,
            text: textConverter(),
            addressedUsername: addressedUsername!,
            addressedId: addressedId!,
            images: result,
            replyType: replyType
        }));

        dispatch(setOpenSnackBar("Your tweet was sent."));
        setText("");
        setImages([]);

        if (onCloseModal) onCloseModal();
    };

    const textConverter = (): string => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.colons_mode = true;
        return emojiConvertor.replace_unified(text);
    };

    const removeImage = useCallback((): void => {
        setImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
    }, [images]);

    const onOpenPoll = (): void => {
        setVisiblePoll(true);
    };

    const onClosePoll = (): void => {
        setPollData(pollInitialState);
        setVisiblePoll(false);
    };

    return (
        <>
            <div className={classes.content}>
                <ProfileAvatar/>
                <div className={classes.textareaWrapper}>
                    <TextareaAutosize
                        onChange={handleChangeTextarea}
                        className={classes.contentTextarea}
                        placeholder={visiblePoll ? "Ask a question..." : title}
                        value={text}
                        maxRows={maxRows}
                        minRows={images.length !== 0 ? 1 : minRows}
                    />
                </div>
            </div>
            <AddTweetImage images={images} removeImage={removeImage}/>
            {quoteTweet && <Quote quoteTweet={quoteTweet}/>}
            <Poll pollData={pollData} setPollData={setPollData} visiblePoll={visiblePoll} onClose={onClosePoll}/>
            <Reply replyType={replyType} setReplyType={setReplyType}/>
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages onChangeImages={setImages}/>
                    {(buttonName !== "Trả lời") && (
                        <div className={classes.quoteImage}>
                            <ActionIconButton
                                actionText={"Bình chọn"}
                                icon={PullIcon}
                                onClick={onOpenPoll}
                                disabled={!!quoteTweet}
                                size={"medium"}
                            />
                        </div>
                    )}
                    <EmojiIconButton addEmoji={addEmoji}/>
                </div>
                <div className={classes.footerAddForm}>
                    {text && (
                        <>
                            <span id={"textCount"}>{textCount}</span>
                            <div className={classes.footerAddFormCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: "red"} : undefined}
                                />
                                <CircularProgress
                                    style={{color: "rgba(0, 0, 0, 0.1)"}}
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={(buttonName === "Trả lời") ? handleClickReplyTweet :
                            (quoteTweet !== undefined ? handleClickQuoteTweet : handleClickAddTweet)}
                        disabled={
                            visiblePoll ? (
                                !pollData.choice1 || !pollData.choice2 || !text || text.length >= MAX_LENGTH
                            ) : (
                                !text || text.length >= MAX_LENGTH
                            )}
                        color="primary"
                        variant="contained"
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddTweetForm;
