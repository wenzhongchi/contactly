import React from "react";
import { NextPage } from "next";

import { Flex } from "@contactly-ui/flex";

import Sidebar from "@components/Sidebar/Sidebar";

const DashboardPage: NextPage = () => (
    <Flex flexDirection="row" width="100%" height="100vh">
        <Sidebar />
    </Flex>
);

export default DashboardPage;
