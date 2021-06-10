import React from "react";

import { Card } from "@contactly-ui/card";

import ChatInput from "./ChatInput";

type ChatCardProps = {
    children: React.ReactNode;
};

const ChatCard: React.FC<ChatCardProps> = ({ children }) => (
    <Card
        flexDirection="column"
        justifyContent="space-between"
        variant="strong"
        width="360px"
        bg="card.secondary"
        borderRadius={6}
    >
        {children}
        <ChatInput
            onSend={() => {
                console.log("hello");
            }}
        />
    </Card>
);

export default ChatCard;
