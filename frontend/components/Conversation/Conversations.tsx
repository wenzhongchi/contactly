import React from "react";

import { Card } from "@contactly-ui/card";
import { Flex } from "@contactly-ui/flex";
import { Button } from "@contactly-ui/button";
import IconPlus from "@contactly-ui/icons/dist/icons/Plus";

import { ConversationType } from "@type/types";

import Conversation from "./Conversation";

type ConversationsProps = {
    conversations: ConversationType[];
};

const Conversations: React.FC<ConversationsProps> = ({ conversations }) => (
    <Card
        variant="medium"
        flexDirection="column"
        alignItems="center"
        bg="card.primary"
        mx="14px"
        mt="20px"
        pt="2px"
    >
        {conversations.map((conversation) => (
            <Conversation key={conversation.id} conversation={conversation} />
        ))}
        <Flex width="100%" bg="card.white" alignItems="center" justifyContent="center">
            <Button
                width="100%"
                variant="text"
                size="sm"
                label="More conversations"
                leftIcon={<IconPlus width="16px" height="16px" />}
            />
        </Flex>
    </Card>
);

export default Conversations;
