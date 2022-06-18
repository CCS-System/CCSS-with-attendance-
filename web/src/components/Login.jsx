import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
};

const Component = ({
    email: initialEmail,
    password: initialPassword,
    onSubmit,
    isLoading,
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            email: initialEmail || "",
            password: initialPassword || "",
        },
        onSubmit: (payload) => {
            if (payload.email && payload.password) {
                if (onSubmit) {
                    onSubmit(payload);
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Email" error={errors.email}>
                <Input
                    disabled={isLoading}
                    id="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
            </FormControl>
            <FormControl label="Password" error={errors.password}>
                <Input
                    disabled={isLoading}
                    id="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
            </FormControl>
            <Button
                type="button"
                id="save"
                overrides={{ BaseButton: { style: () => ({ width: "100%" }) } }}
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Login
            </Button>
        </>
    );
};
export default Component;
