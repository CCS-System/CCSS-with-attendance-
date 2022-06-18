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
    fullname: Yup.string().required('Fullname is required'),
    department: Yup.array().required('Department is required'),
};

const Component = ({
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

            department: initialDepartment || [],
        },
        onSubmit: (payload) => {
            if (payload.fullname) {
                if (onSubmit) {
                    onSubmit({ ...payload, departments: payload.department.map(({ id }) => id) });
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

            <FormControl label="Department" error={!departments.length ? "No Departments are currently avaliable" : errors.department}>
                <Select
                    disabled={isLoading}
                    id="department"
                    options={departments}
                    multi
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("department", value);
                    }}
                    value={values.department}
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
