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
    capacity: Yup.string().required('Capacity is required'),
    name: Yup.string().required('Name is required'),
    department: Yup.array().required('Department is required'),
    type: Yup.array().required('Classroom type is required'),
};

const Component = ({
    name: initialName,
    capacity: initialYear,
    department: initialDepartment,
    type: initialType,
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
            capacity: initialYear || "",
            department: initialDepartment || [],
            type: initialType || [],
        },
        onSubmit: (payload) => {
            if (payload.name && payload.capacity && payload.department && payload.type) {
                if (onSubmit) {
                    onSubmit({ ...payload, department: payload.department[0].id, type: payload.type[0].id });
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

            <FormControl label="Classroom Name" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
            </FormControl>
            <FormControl label="Classroom Type" error={errors.type}>
                <Select
                    disabled={isLoading}
                    id="type"
                    options={[{ id: "LECTURE", label: "Lecture" }, { id: "LAB", label: "Lab" }]}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("type", value);
                    }}
                    value={values.type}
                />
            </FormControl>
            <FormControl label="Capacity" error={errors.capacity}>
                <Input
                    disabled={isLoading}
                    id="capacity"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.capacity}
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
