import React from "react";

import { Flex } from "@contactly-ui/flex";
import { Card } from "@contactly-ui/card";
import { Text } from "@contactly-ui/text";

import LogoIcon from "@icons/LogoIcon";

type PoweredCardProps = {
    children: React.ReactNode;
};

const PoweredCard: React.FC<PoweredCardProps> = ({ children }) => (
    <Card
        flexDirection="column"
        justifyContent="space-between"
        variant="strong"
        width="360px"
        bg="card.secondary"
        borderRadius={6}
    >
        {children}
        <Flex
            boxShadow="elevation2"
            flex={1}
            mt={20}
            minHeight="44px"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            bg="card.white"
        >
            <LogoIcon width={20} height={20} />
            <Text ml={10}>Powered by</Text>
            <Text fontWeight={600} ml={2}>
                Contactly
            </Text>
        </Flex>
    </Card>
);

export default PoweredCard;
