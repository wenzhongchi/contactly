import React from "react";
import QR from "qrcode.react";

import { Flex } from "@contactly-ui/flex";
import { Text } from "@contactly-ui/text";

const QRCode: React.FC = () => (
    <Flex flexDirection="column" alignItems="center">
        <QR value="http://www.google.com" />
        <Text variant="body-sm" textAlign="center" width="70%" mt="12px" opacity={0.8}>
            Got questions? We are here to help! Chats are logged, in case we miss you.
        </Text>
    </Flex>
);

export default QRCode;
