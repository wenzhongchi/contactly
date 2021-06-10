import React from "react";

import { Flex } from "@contactly-ui/flex";

import { FeatureType } from "@type/types";

import FeatureCard from "./FeatureCard";

type FeaturesProps = {
    features: FeatureType[];
};

const Features: React.FC<FeaturesProps> = ({ features }) => (
    <Flex flexDirection="column" alignItems="center" mx="14px">
        {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
        ))}
    </Flex>
);

export default Features;
