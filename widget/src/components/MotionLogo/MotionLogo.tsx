import React, { useEffect, useCallback, useState } from "react";

import IconClose from "@contactly-ui/icons/dist/icons/Close";
import LogoIcon from "@icons/LogoIcon";

type MotionLogoProps = {
    isOpen: boolean | undefined;
};

const MotionLogo: React.FC<MotionLogoProps> = ({ isOpen }) => {
    const [showClose, setShowClose] = useState(false);

    const openSequence = useCallback(async () => {
        console.log("open");
    }, []);

    const closeSequence = useCallback(async () => {
        console.log("close");
    }, []);

    useEffect(() => {
        if (isOpen === undefined) return;

        if (isOpen) {
            openSequence();
        } else {
            closeSequence();
        }
    }, [isOpen, openSequence, closeSequence]);

    return showClose ? <IconClose color="icon.white" width="36px" height="36px" /> : <LogoIcon />;
};

export default MotionLogo;
