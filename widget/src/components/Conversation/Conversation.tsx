import React, { useCallback, useState } from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";

import { ConversationType } from "@type/types";

type ConversationProps = {
    conversation: ConversationType;
    onClick?: (conversation: ConversationType) => void;
};

const Conversation: React.FC<ConversationProps> = ({ conversation, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, [setIsHovered]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, [setIsHovered]);

    const handleOnClick = useCallback(() => {
        if (onClick) onClick(conversation);
    }, [onClick, conversation]);

    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            bg={isHovered ? "card.secondary" : "card.white"}
            css={{ cursor: "pointer" }}
            borderBottom={1}
            borderColor="card.border"
            px="20px"
            py="14px"
            width="100%"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
        >
            <Flex flexDirection="row" justifyContent="center" alignItems="center" flex={1}>
                <Avatar variant="sm" src={conversation.avatarUrl} />
                <Flex flexDirection="column" flex={1} justifyContent="center" ml="12px">
                    <Text variant="caption" fontWeight={600} color="text.secondary">
                        {conversation.name}
                    </Text>
                    <Text variant="body-sm" color="text.dim" width="70%" mt="2px">
                        {conversation.lastMessage}
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                <Text variant="body-sm" color="text.dim">
                    {conversation.date.toDateString()}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Conversation;
