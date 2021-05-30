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

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: "transparent"
  }
`;

const App: React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider>
                <PoweredCard>
                    <Flex flexDirection="column">
                        <Profile />
                        <NewConversation />
                    </Flex>
                    <Conversations conversations={conversations} />
                    <Features features={features} />
                </PoweredCard>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
