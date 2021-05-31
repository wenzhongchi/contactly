import React, { useState, useCallback } from "react";

import { Flex } from "@contactly-ui/flex";
import IconChevronLeft from "@contactly-ui/icons/dist/icons/ChevronLeft";

type BackButtonProps = {
    onClick: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    return (
        <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="40px"
            height="40px"
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            position="relative"
            css={{ cursor: "pointer" }}
        >
            <IconChevronLeft width="20px" height="20px" color="icon.white" />
            <Flex
                position="absolute"
                bottom="0px"
                right="0px"
                bg={isHovered ? "card.secondary" : "card.transparent"}
                opacity={isHovered ? 0.3 : 0}
                width="40px"
                height="40px"
                onClick={onClick}
                borderRadius="4px"
            />
        </Flex>
    );
};

export default BackButton;
