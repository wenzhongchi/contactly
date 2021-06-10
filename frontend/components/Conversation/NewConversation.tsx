import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Box } from "@contactly-ui/box";
import { Card } from "@contactly-ui/card";
import { Checkbox } from "@contactly-ui/checkbox";
import { Text } from "@contactly-ui/text";
import { Button } from "@contactly-ui/button";
import IconMessageSquare from "@contactly-ui/icons/dist/icons/MessageSquare";

type NewConversationProps = {
    onClick: () => void;
};

const NewConversation: React.FC<NewConversationProps> = ({ onClick }) => (
    <Flex flexDirection="column" alignItems="center" position="relative">
        <Box
            width="100%"
            height="40px"
            bg="card.primary"
            position="absolute"
            top="0px"
            zIndex={2}
        />
        <Card zIndex={3} variant="medium" flexDirection="column" bg="card.white" mx="14px" p="20px">
            <Text variant="heading" color="text.secondary">
                Talk to our beauty experts for personalized solutions
            </Text>
            <Checkbox label="I agree to the Terms & Conditions" mt="20px" />
            <Button
                variant="primary"
                size="sm"
                label="New Conversation"
                width="182px"
                mt="20px"
                borderRadius="24px"
                leftIcon={<IconMessageSquare />}
                onClick={onClick}
            />
        </Card>
    </Flex>
);

export default NewConversation;
