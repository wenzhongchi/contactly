import React, { useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";

import { ThemeProvider } from "@contactly-ui/theme";
import { IconButton } from "@contactly-ui/button";
import { Flex } from "@contactly-ui/flex";

import * as EventTypes from "@constants/events";
import MessageCard from "@components/MessageCard/MessageCard";
import MessageInput from "@components/MessageInput/MessageInput";
import MotionLogo from "@components/MotionLogo/MotionLogo";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const App: React.FC = () => {
    const [isMessengerOpen, setIsMessengerOpen] = useState<boolean | undefined>(undefined);

    const handleOpenMessenger = useCallback(() => {
        setIsMessengerOpen(true);
        window.parent.postMessage({ type: EventTypes.OPEN_MESSENGER_IFRAME }, "*");
    }, []);

    const handleCloseMessenger = useCallback(() => {
        setIsMessengerOpen(false);
        window.parent.postMessage({ type: EventTypes.CLOSE_MESSENGER_IFRAME }, "*");
    }, []);

    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider>
                <Flex flexDirection="column" alignItems="flex-end">
                    <MessageCard />
                    <MessageInput />

                    <IconButton
                        variant="primary"
                        backgroundColor="button.widget"
                        width="60px"
                        height="60px"
                        borderRadius="30px"
                        mt="30px"
                        onClick={isMessengerOpen ? handleCloseMessenger : handleOpenMessenger}
                        icon={<MotionLogo isOpen={isMessengerOpen} />}
                    />
                </Flex>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
