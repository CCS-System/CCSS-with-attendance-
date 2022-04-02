import React, { useEffect, useState } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    List,
    arrayMove,
    arrayRemove
} from "baseui/dnd-list";
import { ListItem, ListItemLabel, ListHeading } from 'baseui/list';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
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
    const [students, setStudents] = useState([]);
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

            setStudents([...students, { ...payload, section: payload.section[0].id }]);


        },
    });

    return (
        <>
            <FlexGrid
                flexGridColumnCount={2}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
                justifyItems="space-between"
            >
                <FlexGridItem>
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
                </FlexGridItem>
                <FlexGridItem>
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
                </FlexGridItem>
                <FlexGridItem>

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
                </FlexGridItem>
                <FlexGridItem>

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
                </FlexGridItem>
            </FlexGrid>

            <Button
                type="button"
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => ({
                            width: "100%"
                        }),
                    },
                }}

                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Add
            </Button>
            <ListHeading
            heading="Students"
            maxLines={1}
        />
            <List
                items={students.map(({ studentId, fullname }) => (`${fullname} [${studentId}]`))}
                removable
                onChange={({ oldIndex, newIndex }) =>
                    setStudents(
                        newIndex === -1
                            ? arrayRemove(students, oldIndex)
                            : arrayMove(students, oldIndex, newIndex)
                    )
                }
            />

            <Button
                type="button"
                id="save"
                disabled={students.length < 1}
                onClick={() => {
                    onSubmit({ students });
                }}
                isLoading={isLoading}
            >
                Save All
            </Button>
        </>
    );
};
export default Component;
