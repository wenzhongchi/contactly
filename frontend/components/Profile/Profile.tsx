import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";

const Profile: React.FC = () => (
    <Flex flexDirection="column" alignItems="center" bg="card.primary">
        <Avatar
            variant="xl"
            src="https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png"
            mt="30px"
        />
        <Text variant="display-sm" fontWeight={600} color="text.white" mt="12px">
            Google
        </Text>
        <Text
            variant="body-sm"
            textAlign="center"
            color="text.light"
            width="70%"
            mt="12px"
            opacity={0.8}
        >
            Got questions? We are here to help! Chats are logged, in case we miss you.
        </Text>
        <Flex mt="12px">
            <Text variant="body-sm" color="text.white">
                Queens NY
            </Text>
        </Flex>
        <Flex mt="14px" mb="20px" />
    </Flex>
);

export default Profile;
