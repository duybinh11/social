import React, {FC, memo, ReactElement} from "react";

import SmallLinkPreview from "../../SmallLinkPreview/SmallLinkPreview";
import {LinkCoverSize} from "../../../store/types/common";
import LargeLinkPreview from "../../LargeLinkPreview/LargeLinkPreview";

interface TweetMediaProps {
    link?: string;
    linkTitle?: string;
    linkDescription?: string;
    linkCover?: string;
    linkCoverSize?: LinkCoverSize;
}

const TweetMedia: FC<TweetMediaProps> = memo((
    {
        link,
        linkTitle,
        linkDescription,
        linkCover,
        linkCoverSize
    }
): ReactElement => {
    return (
        <>
            {link && (
                (linkCoverSize === LinkCoverSize.LARGE) ? (
                    <LargeLinkPreview
                        link={link}
                        linkTitle={linkTitle!}
                        linkDescription={linkDescription!}
                        linkCover={linkCover!}
                    />
                ) : (
                    <SmallLinkPreview
                        link={link}
                        linkTitle={linkTitle!}
                        linkDescription={linkDescription!}
                        linkCover={linkCover!}
                    />
                )
            )}
        </>
    );
});

export default TweetMedia;
