import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Card } from "@contactly-ui/card";
import { Input } from "@contactly-ui/input";
import { IconButton } from "@contactly-ui/button";
import IconSend from "@contactly-ui/icons/dist/icons/Send";

const MessageInput: React.FC = () => (
    <Flex flexDirection="column" alignItems="flex-end" mt={20}>
        <Card variant="soft" height="50px" alignItems="center" pr={12}>
            <Input variant="text" placeholder="Enter your email" />
            <IconButton variant="primary" icon={<IconSend />} />
        </Card>
    </Flex>
);

export default MessageInput;
