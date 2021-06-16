import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Avatar } from "@contactly-ui/avatar";
import { Stack } from "@contactly-ui/stack";

import SidebarButton from "./SidebarButton";

const Sidebar: React.FC = () => (
    <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="card.primary"
        width="60px"
    >
        <Stack direction="column" spacing="10px" mt="20px" width="100%">
            <SidebarButton />
            <SidebarButton />
            <SidebarButton />
            <SidebarButton />
        </Stack>
        <Stack direction="column" spacing="10px" mb="20px" width="100%">
            <SidebarButton />
            <SidebarButton />
            <SidebarButton />
            <Flex justifyContent="center" alignItems="center">
                <Avatar
                    variant="sm"
                    src="https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png"
                />
            </Flex>
        </Stack>
    </Flex>
);

export default Sidebar;
