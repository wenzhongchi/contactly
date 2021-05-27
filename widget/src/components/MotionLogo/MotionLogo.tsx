import React, { useEffect, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { IconClose } from "@contactly-ui/icons";

import LogoIcon from "@icons/LogoIcon";

type MotionLogoProps = {
    isOpen: boolean | undefined;
};

const MotionLogo: React.FC<MotionLogoProps> = ({ isOpen }) => {
    const [showClose, setShowClose] = useState(false);
    const controls = useAnimation();

    const openSequence = useCallback(async () => {
        await controls.start({ rotate: 45, transition: { duration: 0.1 } });
        await controls.start({ opacity: 0, transition: { duration: 0.01 } });
        setShowClose(true);
        await controls.start({ opacity: 1, transition: { duration: 0.01 } });
        await controls.start({ rotate: 90, transition: { duration: 0.1 } });
    }, [controls]);

    const closeSequence = useCallback(async () => {
        await controls.start({ rotate: 45, transition: { duration: 0.1 } });
        await controls.start({ opacity: 0, transition: { duration: 0.01 } });
        setShowClose(false);
        await controls.start({ opacity: 1, transition: { duration: 0.01 } });
        await controls.start({ rotate: 0, transition: { duration: 0.1 } });
    }, [controls]);

    useEffect(() => {
        if (isOpen === undefined) return;

        if (isOpen) {
            openSequence();
        } else {
            closeSequence();
        }
    }, [isOpen, openSequence, closeSequence]);

    return (
        <motion.div
            style={{
                width: 36,
                height: 36,
            }}
            animate={controls}
        >
            {showClose ? <IconClose color="icon.white" width="36px" height="36px" /> : <LogoIcon />}
        </motion.div>
    );
};

export default MotionLogo;
