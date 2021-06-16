import React from "react";

import { Flex } from "@contactly-ui/flex";

const UserLayout: React.FC = ({ children }) => (
    <Flex maxWidth="1200px" width={1} padding={0}>
        {children}
    </Flex>
);

export default UserLayout;
