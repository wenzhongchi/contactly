import React from "react";

import { Flex } from "@contactly-ui/flex";
import { ArrowCard } from "@contactly-ui/card";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";

const MessageCard: React.FC = () => (
    <Flex>
        <Flex alignItems="flex-end">
            <Avatar
                variant="xs"
                src="https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png"
                boxShadow="elevation2"
            />
        </Flex>
        <Flex ml={16}>
            <ArrowCard flexDirection="column" width="320px" padding="10px" variant="soft">
                <Text variant="heading">Hi, How can i help you?</Text>
                <Text variant="body">Have a question? Text us here</Text>
            </ArrowCard>
        </Flex>
    </Flex>
);

export default MessageCard;
