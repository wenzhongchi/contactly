import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Text } from "@contactly-ui/text";
import { Card } from "@contactly-ui/card";
import { Stack } from "@contactly-ui/stack";

import { ProfileRowEnum } from "@type/types";
import UserProfileRow from "@components/Profile/UserProfileRow";

const UserProfile: React.FC = () => (
    <Card variant="medium" flexDirection="column" alignItems="center" bg="card.primary">
        <Avatar
            variant="xl"
            src="https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png"
            mt="30px"
        />
        <Text variant="display-sm" fontWeight={600} color="text.white" mt="12px">
            John Doe
        </Text>
        <Flex mt="12px">
            <Text variant="body-sm" color="text.white">
                Queens NY
            </Text>
        </Flex>
        <Stack direction="column" mt="14px" mb="20px" px="20px" spacing="20px">
            <UserProfileRow
                profile={{
                    type: ProfileRowEnum.EMAIL,
                    title: "Email",
                    value: "xyz@gmail.com",
                }}
            />
            <UserProfileRow
                profile={{
                    type: ProfileRowEnum.PHONE,
                    title: "Email",
                    value: "xyz@gmail.com",
                }}
            />
            <UserProfileRow
                profile={{
                    type: ProfileRowEnum.ADDRESS,
                    title: "Email",
                    value: "xyz@gmail.com",
                }}
            />
            <UserProfileRow
                profile={{
                    type: ProfileRowEnum.TIMEZONE,
                    title: "Email",
                    value: "xyz@gmail.com",
                }}
            />
        </Stack>
    </Card>
);

export default UserProfile;
