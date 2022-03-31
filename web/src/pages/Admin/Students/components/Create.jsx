import React, { useEffect, useState } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/departments"
import sectionsAPI from "../../../../api/sections"
const commonSchema = {
    studentId: Yup.string().required('Student ID is required'),
    fullname: Yup.string().required('Full Name is required'),
    department: Yup.array().required('Department is required'),
    section: Yup.array().required('Section is required'),
};

const Component = ({
    fullname: initialFullName,
    studentId: initialStudentId,
    department: initialDepartment,
    section: initialSection,
    onSubmit,
    isLoading: l,
}) => {

    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const { loading, request } = useAPI(theAPI.all, { onComplete: (data) => { setDepartments(data.map(({ id, name }) => ({ id, label: name }))) } });
    const { loading: l2, request: fetchSections } = useAPI(sectionsAPI.allByDepartmentSlot, { onComplete: (data) => { setSections(data.map(({ id, name }) => ({ id, label: name }))) } });
    const isLoading = l || l2 || loading;
    useEffect(() => { request(); if (initialDepartment) { fetchSections(initialDepartment[0].id) } }, []);
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
            fullname: initialFullName || "",
            studentId: initialStudentId || "",
            department: initialDepartment || [],
            section: initialSection || [],
        },
        onSubmit: (payload) => {
            if (onSubmit) {
                onSubmit({ ...payload, section: payload.section[0].id });
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
                        if (value && value.length) {
                            setFieldValue("department", value);
                            fetchSections(value[0].id);
                        }
                    }}
                    value={values.department}
                />
            </FormControl>

            <FormControl label="Section" error={!sections.length ? "No Sections are currently avaliable" : errors.section}>
                <Select
                    disabled={isLoading}
                    id="section"
                    options={sections}
                    onChange={({ value }) => {
                        if (value && value.length) {
                            setFieldValue("section", value);

                        }
                    }}
                    value={values.section}
                />
            </FormControl>

            <FormControl label="Student ID" error={errors.studentId}>
                <Input
                    disabled={isLoading}
                    id="studentId"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentId}
                />
            </FormControl>

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
