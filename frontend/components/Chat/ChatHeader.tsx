import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";

import { OperatorType } from "@type/types";
import BackButton from "@components/BackButton/BackButton";

type ChatHeaderProps = {
    operator: OperatorType;
    onBack: () => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ operator, onBack }) => (
    <Flex flexDirection="row" alignItems="center" bg="card.primary" py="12px">
        <Flex ml="12px">
            <BackButton onClick={onBack} />
        </Flex>
        <Flex flexDirection="row" justifyContent="center" alignItems="center" flex={1} ml="12px">
            <Avatar variant="sm" src={operator.avatarUrl} height="30px" width="30px" />
            <Flex flexDirection="column" flex={1} justifyContent="center" ml="12px">
                <Text variant="caption" fontWeight={500} color="text.white">
                    {operator.name}
                </Text>
                <Text variant="body-sm" color="text.light">
                    {operator.active ? "Online" : "Offline"}
                </Text>
            </Flex>
        </Flex>
    </Flex>
);

export default ChatHeader;
