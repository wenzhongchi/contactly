import React, { useCallback, useState } from "react";

import { Flex } from "@contactly-ui/flex";
import { Text } from "@contactly-ui/text";
import { IconMail, IconPhone, IconMapPin, IconClock } from "@contactly-ui/icons";

import { SidebarMenuEnum } from "@type/types";

type SidebarButtonProps = {
    type: SidebarMenuEnum;
    defaultSelected?: boolean;
    onClick?: (type: SidebarMenuEnum) => void;
};

const InboxPanelRow: React.FC<SidebarButtonProps> = ({
    type,
    defaultSelected = false,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(defaultSelected);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    const handleOnClick = useCallback(() => {
        if (onClick) onClick(type);
        setIsSelected(true);
    }, [onClick, type]);

    const getBgColor = useCallback(() => {
        if (isSelected) return "card.default";
        if (isHovered) return "card.default";
        return "card.transparent";
    }, [isHovered, isSelected]);

    const getIconColor = useCallback(() => {
        if (isSelected) return "icon.primary";
        if (isHovered) return "icon.white";
        return "icon.default";
    }, [isHovered, isSelected]);

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

    const getTitle = useCallback(() => {
        switch (type) {
            case SidebarMenuEnum.CHAT:
                return "You";
            case SidebarMenuEnum.CALENDAR:
                return "Mentions";
            case SidebarMenuEnum.CONTACT:
                return "All";
            case SidebarMenuEnum.PROPERTY:
                return "Unassigned";
            default:
                return "Support";
        }
    }, [type]);

    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            bg={getBgColor()}
            css={{ cursor: "pointer" }}
            width="100%"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
            px="16px"
            py="6px"
        >
            <Flex flexDirection="row" justifyContent="flex-start">
                {getIcon()}
                <Text ml="12px">{getTitle()}</Text>
            </Flex>
            <Text>234</Text>
        </Flex>
    );
};

export default InboxPanelRow;
