import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Flex } from "@contactly-ui/flex";

import UserLayout from "@components/Layout/UserLayout";
import UserProfile from "@components/Profile/UserProfile";
import QRCode from "@components/QRCode/QRCode";

const UserPage: NextPage = () => {
    const router = useRouter();
    const { uid } = router.query;

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <UserLayout>
                <Flex flexDirection="column">
                    <UserProfile />
                    <QRCode />
                </Flex>
            </UserLayout>
        </Flex>
    );
};

export default UserPage;
