import React, { useCallback, useState } from "react";

import { Flex } from "@contactly-ui/flex";
import { Card } from "@contactly-ui/card";
import { Text } from "@contactly-ui/text";
import IconChevronRight from "@contactly-ui/icons/dist/icons/ChevronRight";
import IconMail from "@contactly-ui/icons/dist/icons/Mail";
import IconThumbsUp from "@contactly-ui/icons/dist/icons/ThumbsUp";
import IconFolder from "@contactly-ui/icons/dist/icons/Folder";
import IconCalendar from "@contactly-ui/icons/dist/icons/Calendar";

import { FeatureType, FeatureTypeEnum } from "@type/types";

type FeatureCardProps = {
    feature: FeatureType;
    onClick?: (feature: FeatureType) => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    const handleOnClick = useCallback(() => {
        if (onClick) onClick(feature);
    }, [onClick, feature]);

    const getIconBgColor = useCallback(() => {
        switch (feature.type) {
            case FeatureTypeEnum.NEWSLETTER:
                return "card.default";
            case FeatureTypeEnum.TESTIMONIAL:
                return "card.error";
            case FeatureTypeEnum.APPOINTMENT:
                return "card.default";
            case FeatureTypeEnum.KNOWLEDGE:
                return "card.success";
            default:
                return "card.default";
        }
    }, [feature]);

    const getIconColor = useCallback(() => {
        switch (feature.type) {
            case FeatureTypeEnum.NEWSLETTER:
                return "icon.primary";
            case FeatureTypeEnum.TESTIMONIAL:
                return "icon.error";
            case FeatureTypeEnum.APPOINTMENT:
                return "icon.default";
            case FeatureTypeEnum.KNOWLEDGE:
                return "icon.success";
            default:
                return "icon.default";
        }
    }, [feature]);

    const getIcon = useCallback(() => {
        switch (feature.type) {
            case FeatureTypeEnum.NEWSLETTER:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
            case FeatureTypeEnum.TESTIMONIAL:
                return <IconThumbsUp height="18px" width="18px" color={getIconColor()} />;
            case FeatureTypeEnum.APPOINTMENT:
                return <IconCalendar height="18px" width="18px" color={getIconColor()} />;
            case FeatureTypeEnum.KNOWLEDGE:
                return <IconFolder height="18px" width="18px" color={getIconColor()} />;
            default:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
        }
    }, [feature, getIconColor]);

    return (
        <Card
            variant="medium"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            bg={isHovered ? "card.secondary" : "card.white"}
            borderRadius="10px"
            px="20px"
            py="14px"
            mt="20px"
            width="100%"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
        >
            <Flex flexDirection="row" alignItems="center" flex={1}>
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    bg={getIconBgColor()}
                    borderRadius="10px"
                    height="30px"
                    width="30px"
                >
                    {getIcon()}
                </Flex>
                <Text variant="body-md" fontWeight={600} ml="12px">
                    {feature.label}
                </Text>
            </Flex>
            <IconChevronRight />
        </Card>
    );
};

export default FeatureCard;
