import React, { useCallback } from "react";

import { Flex } from "@contactly-ui/flex";
import { Text } from "@contactly-ui/text";
import { IconMail, IconPhone, IconMapPin, IconClock } from "@contactly-ui/icons";

import { ProfileRowEnum, ProfileRowType } from "@type/types";

type UserProfileRowProps = {
    profile: ProfileRowType;
};

const UserProfileRow: React.FC<UserProfileRowProps> = ({ profile }) => {
    const getIconBgColor = useCallback(() => {
        switch (profile.type) {
            case ProfileRowEnum.EMAIL:
                return "card.default";
            case ProfileRowEnum.PHONE:
                return "card.error";
            case ProfileRowEnum.ADDRESS:
                return "card.default";
            case ProfileRowEnum.TIMEZONE:
                return "card.success";
            default:
                return "card.default";
        }
    }, [profile]);

    const getIconColor = useCallback(() => {
        switch (profile.type) {
            case ProfileRowEnum.EMAIL:
                return "icon.primary";
            case ProfileRowEnum.PHONE:
                return "icon.error";
            case ProfileRowEnum.ADDRESS:
                return "icon.default";
            case ProfileRowEnum.TIMEZONE:
                return "icon.success";
            default:
                return "icon.default";
        }
    }, [profile]);

    const getIcon = useCallback(() => {
        switch (profile.type) {
            case ProfileRowEnum.EMAIL:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
            case ProfileRowEnum.PHONE:
                return <IconPhone height="18px" width="18px" color={getIconColor()} />;
            case ProfileRowEnum.ADDRESS:
                return <IconMapPin height="18px" width="18px" color={getIconColor()} />;
            case ProfileRowEnum.TIMEZONE:
                return <IconClock height="18px" width="18px" color={getIconColor()} />;
            default:
                return <IconMail height="18px" width="18px" color={getIconColor()} />;
        }
    }, [profile, getIconColor]);

    return (
        <Flex flexDirection="row" alignItems="center" flex={1}>
            <Flex
                justifyContent="center"
                alignItems="center"
                bg={getIconBgColor()}
                borderRadius="10px"
                height="30px"
                width="30px"
            >
                {getIcon()}
            </Flex>
            <Flex flexDirection="column" justifyContent="center" ml="12px">
                <Text variant="body-md" fontWeight={600} color="text.white">
                    {profile.title}
                </Text>
                <Text variant="body-md" fontWeight={600} color="text.white">
                    {profile.value}
                </Text>
            </Flex>
        </Flex>
    );
};

export default UserProfileRow;
