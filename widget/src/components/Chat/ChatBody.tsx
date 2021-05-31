import React from "react";

import { Flex } from "@contactly-ui/flex";

import { MessageType } from "@type/types";

import ChatBox from "./ChatBox";

type ChatBodyProps = {
    messages: MessageType[];
};

const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => (
    <Flex
        flexDirection="column"
        alignItems="center"
        minHeight="400px"
        maxHeight="500px"
        overflow="auto"
        py="10px"
    >
        {messages.map((message) => (
            <ChatBox key={message.id} message={message} />
        ))}
    </Flex>
);

export default ChatBody;
