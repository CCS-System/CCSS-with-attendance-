import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    fullname: Yup.string().required('Fullname is required'),
};

const Component = ({
    email: initialEmail,
    password: initialPassword,
    fullname: initialFullname,
    onSubmit,
    isLoading,
    isAdmin
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            fullname: initialFullname || "",
            email: initialEmail || "",
            password: initialPassword || "",
        },
        onSubmit: (payload) => {
            if (payload.email && payload.password && payload.fullname) {
                if (onSubmit) {
                    onSubmit({ ...payload });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Full Name" error={errors.fullname}>
                <Input
                    disabled={isLoading}
                    id="fullname"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullname}
                />
            </FormControl>
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
                kind="secondary"
                shape="pill"
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Sign Up
            </Button>
        </>
    );
};
export default Component;
