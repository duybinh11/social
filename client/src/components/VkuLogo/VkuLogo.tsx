import React, {FC, ReactElement} from "react";

export const VKU_LOGO_SRC = `${process.env.PUBLIC_URL}/logo_vku.png`;

interface VkuLogoProps {
    height?: number | string;
    width?: number | string;
    className?: string;
    alt?: string;
}

const VkuLogo: FC<VkuLogoProps> = ({
    height = 32,
    width = 32,
    className,
    alt = "VKU",
}): ReactElement => (
    <img
        src={VKU_LOGO_SRC}
        alt={alt}
        height={height}
        width={width}
        className={className}
        style={{objectFit: "contain", display: "block", borderRadius: "22%"}}
    />
);

export default VkuLogo;
