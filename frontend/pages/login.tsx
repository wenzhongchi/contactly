import React, { useCallback } from "react";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";

import { Flex } from "@contactly-ui/flex";
import { Input } from "@contactly-ui/input";
import { Button } from "@contactly-ui/button";
import { IconLock } from "@contactly-ui/icons";

import PhoneInput from "@components/PhoneInput/PhoneInput";

const validationSchema = Yup.object({
    phone: Yup.string().phone().required("Phone is required field"),
    password: Yup.string()
        .required("Password is required field")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
});

const LoginPage: NextPage = () => {
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        validationSchema,
        onSubmit() {
            console.log(values);
        },
    });

    const handleLogin = useCallback(() => handleSubmit, [handleSubmit]);

    return (
        <Flex flexDirection="row" width="100%" height="100vh">
            <Flex bg="red" height="100%" width="50%" />
            <Flex flexDirection="column" height="100%" width="50%" justifyContent="center">
                <PhoneInput name="phone" onChange={handleChange} value={values.phone} width="40%" />
                <Input
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    leftIcon={<IconLock />}
                    width="40%"
                />
                <Button label="Login" onClick={handleLogin} width="40%" />
            </Flex>
        </Flex>
    );
};

export default LoginPage;
