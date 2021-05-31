import React from "react";

import { Card } from "@contactly-ui/card";
import { Flex } from "@contactly-ui/flex";
import { Button, IconButton } from "@contactly-ui/button";
import { Input } from "@contactly-ui/input";
import IconSmile from "@contactly-ui/icons/dist/icons/Smile";
import IconPaperclip from "@contactly-ui/icons/dist/icons/Paperclip";

type ConversationsProps = {
    onSend: (message: string) => void;
};

const ChatInput: React.FC<ConversationsProps> = ({ onSend }) => (
    <Card
        flexDirection="column"
        alignItems="center"
        bg="card.white"
        borderColor="card.border-primary"
        width="100%"
    >
        <Flex
            flexDirection="column"
            width="100%"
            bg="card.white"
            alignItems="center"
            px="12px"
            py="8px"
        >
            <Input variant="text" placeholder="enter message" width="100%" />
            <Flex width="100%" bg="card.white" alignItems="center">
                <Flex>
                    <IconButton variant="text" icon={<IconSmile />} />
                    <IconButton variant="text" icon={<IconPaperclip />} />
                </Flex>
            </Flex>
        </Flex>
    </Card>
);

export default ChatInput;
