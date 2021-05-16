import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Card } from "@contactly-ui/card";
import { Input } from "@contactly-ui/input";
import { IconButton } from "@contactly-ui/button";

const MessageInput: React.FC = () => (
    <Flex flexDirection="column" alignItems="flex-end" mt={20}>
        <Card variant="soft" width="300px">
            <Input />
            <IconButton variant="primary" />
        </Card>
    </Flex>
);

export default MessageInput;
