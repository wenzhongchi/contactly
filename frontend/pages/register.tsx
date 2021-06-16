import React, { useCallback } from "react";
import { NextPage } from "next";

import "yup-phone";

import { Flex } from "@contactly-ui/flex";

import RegisterForm from "@components/Register/RegisterForm";
import PinCodeForm from "@components/Register/PinCodeForm";

const RegisterPage: NextPage = () => (
    <Flex flexDirection="row" width="100%" height="100vh">
        <Flex bg="green" height="100%" width="50%" />
        <Flex flexDirection="column" height="100%" width="50%" justifyContent="center">
            <RegisterForm />
            <PinCodeForm />
        </Flex>
    </Flex>
);

export default RegisterPage;
