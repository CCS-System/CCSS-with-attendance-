import React, { useEffect, useState } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/departments"
const commonSchema = {
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
    fullname: Yup.string().required('Fullname is required'),
    department: Yup.array().required('Department is required'),
};

const Component = ({
    email: initialEmail,
    password: initialPassword,
    fullname: initialFullname,
    department: initialDepartment,
    onSubmit,
    isLoading: l,
}) => {
    const [departments, setDepartments] = useState([]);
    const { loading, request } = useAPI(theAPI.all, { onComplete: (data) => { setDepartments(data.map(({ id, name }) => ({ id, label: name }))) } });
    const isLoading = l || loading;
    useEffect(() => { request(); }, [])
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            fullname: initialFullname || "",
            email: initialEmail || "",
            password: initialPassword || "",
            department: initialDepartment || [],
        },
        onSubmit: (payload) => {
            if (payload.email && payload.password && payload.fullname) {
                if (onSubmit) {
                    onSubmit({ ...payload, department: payload.department[0].id });
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
            <FormControl label="Department" error={!departments.length ? "No Departments are currently avaliable" : errors.department}>
                <Select
                    disabled={isLoading}
                    id="department"
                    options={departments}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("department", value);
                    }}
                    value={values.department}
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

            <FormControl label="Confirm Password" error={values.password !== values.confirmPassword ? "Passwords should match" : errors.confirmPassword}>
                <Input
                    disabled={isLoading}
                    id="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                />
            </FormControl>

            <Button
                type="button"
                id="save"
                disabled={values.password !== values.confirmPassword}

                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Save
            </Button>
        </>
    );
};
export default Component;
