import React, { useEffect, useState } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/departments"
const commonSchema = {
    year: Yup.string().required('Year is required'),
    name: Yup.string().required('Name is required'),
    department: Yup.array().required('Department is required'),
};

const Component = ({
    name: initialName,
    year: initialYear,
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
        setFieldValue
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            name: initialName || "",
            year: initialYear || "",
            department: initialDepartment || [],
        },
        onSubmit: (payload) => {
            if (payload.name && payload.year && payload.department) {
                if (onSubmit) {
                    onSubmit({ ...payload, department: payload.department[0].id });
                }
            }
        },
    });

    return (
        <>

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

            <FormControl label="Section Name" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
            </FormControl>
            <FormControl label="Batch Year" error={errors.year}>
                <Input
                    disabled={isLoading}
                    id="year"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.year}
                />
            </FormControl>

            <Button
                type="button"
                id="save"
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
