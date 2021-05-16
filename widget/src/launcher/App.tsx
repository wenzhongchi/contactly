import React from "react";

import { ThemeProvider } from "@contactly-ui/theme";
import { IconButton } from "@contactly-ui/button";
import { Flex } from "@contactly-ui/flex";

import MessageCard from "@components/MessageCard/MessageCard";
import MessageInput from "@components/MessageInput/MessageInput";

const App: React.FC = () => (
    <ThemeProvider>
        <Flex flexDirection="column" width="380px" alignItems="flex-end" flexGrow="1">
            <MessageCard />
            <MessageInput />

            <IconButton variant="primary" size="50px" borderRadius="25px" mt="40px" />
        </Flex>
    </ThemeProvider>
);

export default App;
