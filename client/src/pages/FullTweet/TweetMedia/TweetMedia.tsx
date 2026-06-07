import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";

import SmallLinkPreview from "../../../components/SmallLinkPreview/SmallLinkPreview";
import {LinkCoverSize} from "../../../store/types/common";
import LargeLinkPreview from "../../../components/LargeLinkPreview/LargeLinkPreview";
import {
    selectLinkCover,
    selectLinkCoverSize,
    selectLinkDescription,
    selectLinkTitle,
    selectTweetLink
} from "../../../store/ducks/tweet/selectors";

const TweetMedia = memo((): ReactElement => {
    const link = useSelector(selectTweetLink);
    const linkCover = useSelector(selectLinkCover);
    const linkCoverSize = useSelector(selectLinkCoverSize);
    const linkTitle = useSelector(selectLinkTitle);
    const linkDescription = useSelector(selectLinkDescription);

    return (
        <>
            {link && (
                (linkCoverSize === LinkCoverSize.LARGE) ? (
                    <LargeLinkPreview
                        link={link}
                        linkTitle={linkTitle!}
                        linkDescription={linkDescription!}
                        linkCover={linkCover!}
                        isFullTweet
                    />
                ) : (
                    <SmallLinkPreview
                        link={link}
                        linkTitle={linkTitle!}
                        linkDescription={linkDescription!}
                        linkCover={linkCover!}
                        isFullTweet
                    />
                )
            )}
        </>
    );
});

export default TweetMedia;
