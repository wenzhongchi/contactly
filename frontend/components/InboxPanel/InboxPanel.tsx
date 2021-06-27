import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Stack } from "@contactly-ui/stack";
import { Text } from "@contactly-ui/text";

import { SidebarMenuEnum } from "@type/types";

import InboxPanelRow from "./InboxPanelRow";

const InboxPanel: React.FC = () => (
    <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="card.default"
        width="200px"
    >
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            bg="card.default"
            width="100%"
        >
            <Text ml="10px" mt="24px">
                Inbox
            </Text>
            <Text ml="10px" mt="24px">
                Conversations
            </Text>
            <Stack direction="column" spacing="10px" mt="20px" width="100%">
                <InboxPanelRow type={SidebarMenuEnum.CHAT} />
                <InboxPanelRow type={SidebarMenuEnum.CALENDAR} />
                <InboxPanelRow type={SidebarMenuEnum.PROPERTY} />
                <InboxPanelRow type={SidebarMenuEnum.AGENT} />
                <InboxPanelRow type={SidebarMenuEnum.BUILD} />
            </Stack>
        </Flex>
    </Flex>
);

export default InboxPanel;
