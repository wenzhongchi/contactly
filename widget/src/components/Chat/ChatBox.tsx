import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";
import { Card } from "@contactly-ui/card";
import { MessageType } from "@type/types";

type ConversationProps = {
    message: MessageType;
};

const ChatBox: React.FC<ConversationProps> = ({ message }) => {
    return (
        <Flex flexDirection="column" px="20px" mt="8px" width="100%">
            <Flex
                flexDirection="row"
                justifyContent={message.isOperator ? "flex-start" : "flex-end"}
                alignItems="center"
                flex={1}
            >
                {message.isOperator && <Avatar variant="sm" src={message.avatarUrl} />}
                <Card
                    variant="medium"
                    justifyContent="center"
                    ml="12px"
                    bg={message.isOperator ? "card.white" : "card.primary"}
                    px="16px"
                    py="10px"
                    borderRadius="8px"
                >
                    <Text
                        variant="body-sm"
                        color={message.isOperator ? "text.secondary" : "text.white"}
                    >
                        {message.message}
                    </Text>
                </Card>
            </Flex>
            <Flex
                flexDirection="row"
                justifyContent={message.isOperator ? "flex-start" : "flex-end"}
                alignItems="center"
                flex={1}
            >
                <Text variant="body-sm" color="text.dim" ml="48px" mt="2px">
                    {message.date.toDateString()}
                </Text>
            </Flex>
        </Flex>
    );
};

export default ChatBox;
