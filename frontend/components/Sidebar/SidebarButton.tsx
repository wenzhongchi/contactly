import React, { useCallback, useState } from "react";

import { Flex } from "@contactly-ui/flex";
import { IconMail, IconPhone, IconMapPin, IconClock } from "@contactly-ui/icons";

import { SidebarMenuEnum } from "@type/types";

type SidebarButtonProps = {
    type: SidebarMenuEnum;
    onClick?: (type: SidebarMenuEnum) => void;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({ type, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    const handleOnClick = useCallback(() => {
        if (onClick) onClick(type);
    }, [onClick, type]);

    const getBgColor = useCallback(() => {
        if (isHovered) return "card.default";
        return "card.transparent";
    }, [isHovered]);

    const getIconColor = useCallback(() => {
        if (isHovered) return "icon.white";
        return "icon.default";
    }, [isHovered]);

    const getIcon = useCallback(() => {
        switch (type) {
            case SidebarMenuEnum.CHAT:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
            case SidebarMenuEnum.CALENDAR:
                return <IconPhone height="18px" width="18px" color={getIconColor()} />;
            case SidebarMenuEnum.CONTACT:
                return <IconMapPin height="18px" width="18px" color={getIconColor()} />;
            case SidebarMenuEnum.PROPERTY:
                return <IconClock height="18px" width="18px" color={getIconColor()} />;
            default:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
        }
    }, [type, getIconColor]);

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            bg={getBgColor()}
            css={{ cursor: "pointer" }}
            width="100%"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
            py="10px"
        >
            {getIcon()}
        </Flex>
    );
};

export default SidebarButton;
