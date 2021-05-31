import React, { useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";

import { ThemeProvider } from "@contactly-ui/theme";
import { Flex } from "@contactly-ui/flex";

import * as EventTypes from "@constants/events";

import PoweredCard from "@components/PoweredCard/PoweredCard";
import Profile from "@components/Profile/Profile";
import NewConversation from "@components/Conversation/NewConversation";
import Conversations from "@components/Conversation/Conversations";
import Features from "@components/Feature/Features";
import { FeatureTypeEnum } from "@type/types";
import ChatCard from "@components/Chat/ChatCard";
import ChatHeader from "@components/Chat/ChatHeader";
import ChatBody from "@components/Chat/ChatBody";

const conversations = [
    {
        id: "1",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        lastMessage: "How are you.",
        date: new Date(),
    },
    {
        id: "2",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        lastMessage: "How are you.",
        date: new Date(),
    },
    {
        id: "3",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        lastMessage: "How are you.",
        date: new Date(),
    },
];

const features = [
    {
        id: "1",
        type: FeatureTypeEnum.NEWSLETTER,
        label: "Subscribe to our newsletter",
    },
    {
        id: "2",
        type: FeatureTypeEnum.TESTIMONIAL,
        label: "What customers are saying",
    },
    {
        id: "3",
        type: FeatureTypeEnum.APPOINTMENT,
        label: "Schedule an appointment",
    },
];

const messages = [
    {
        id: "1",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "How are you.",
        isOperator: true,
        date: new Date(),
    },
    {
        id: "2",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Hi, I would like to buy running shoes.",
        isOperator: false,
        date: new Date(),
    },
    {
        id: "3",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Hello, thank you for visiting contactly. Please click the link above.",
        isOperator: true,
        date: new Date(),
    },
    {
        id: "4",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Thank you",
        isOperator: false,
        date: new Date(),
    },
    {
        id: "5",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Hi, I would like to buy running shoes.",
        isOperator: false,
        date: new Date(),
    },
    {
        id: "6",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Hello, thank you for visiting contactly. Please click the link above.",
        isOperator: true,
        date: new Date(),
    },
    {
        id: "7",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Thank you",
        isOperator: false,
        date: new Date(),
    },
    {
        id: "8",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Hello, thank you for visiting contactly. Please click the link above.",
        isOperator: true,
        date: new Date(),
    },
    {
        id: "9",
        avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
        name: "Barbara Alex",
        message: "Thank you",
        isOperator: false,
        date: new Date(),
    },
];

const operator = {
    id: "2",
    avatarUrl: "https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png",
    name: "Barbara Alex",
    message: "How are you.",
    active: true,
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: "transparent";
  }
`;

const App: React.FC = () => {
    const [inChat, setInChat] = useState(true);

    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider>
                {!inChat && (
                    <PoweredCard>
                        <Flex flexDirection="column">
                            <Profile />
                            <NewConversation />
                        </Flex>
                        <Conversations conversations={conversations} />
                        <Features features={features} />
                    </PoweredCard>
                )}
                {inChat && (
                    <ChatCard>
                        <ChatHeader
                            operator={operator}
                            onBack={() => {
                                console.log("hello");
                            }}
                        />
                        <ChatBody messages={messages} />
                    </ChatCard>
                )}
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
