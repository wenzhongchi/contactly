import React, { useCallback } from "react";

import { PinInputGroup, PinInput } from "@contactly-ui/input";

const PinCodeForm: React.FC = () => {
    const handleConfirm = useCallback(() => {}, []);

    return (
        <PinInputGroup onComplete={handleConfirm}>
            <PinInput />
            <PinInput />
            <PinInput />
            <PinInput />
        </PinInputGroup>
    );
};

export default PinCodeForm;
