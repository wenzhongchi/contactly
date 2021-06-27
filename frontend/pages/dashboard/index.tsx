import React from "react";
import { NextPage } from "next";

import { Flex } from "@contactly-ui/flex";

import Sidebar from "@components/Sidebar/Sidebar";
import InboxPanel from "@components/InboxPanel/InboxPanel";

const DashboardPage: NextPage = () => (
    <Flex flexDirection="row" width="100%" height="100vh">
        <Sidebar />
        <InboxPanel />
    </Flex>
);

export default DashboardPage;
