import React, { useState, useCallback } from "react";

import { Input, InputProps } from "@contactly-ui/input";
import IconPhone from "@contactly-ui/icons/dist/icons/Phone";

type PhoneInputProps = InputProps;

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange, ...restProps }) => {
    const [inputValue, setInputValue] = useState("");

    const formatPhoneNumber = useCallback((value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, "");

        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;

        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(
            6,
            10,
        )}`;
    }, []);

    const handleInputChange = useCallback(
        (e) => {
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            setInputValue(formattedPhoneNumber);

            if (onChange) onChange(e);
        },
        [formatPhoneNumber, onChange],
    );

    return (
        <Input
            {...restProps}
            leftIcon={<IconPhone />}
            onChange={handleInputChange}
            value={inputValue}
        />
    );
};

export default PhoneInput;
