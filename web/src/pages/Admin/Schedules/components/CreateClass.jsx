import React, { useState, useEffect } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from 'baseui/modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from "baseui/select";
import useAPI from "../../../../hooks/useAPI";
import coursesAPI from "../../../../api/courses";
import teachersAPI from "../../../../api/teachers";

const commonSchema = {
    course: Yup.array().required('Course is required'),
    type: Yup.array().required('Course type is required'),
    teachers: Yup.array().required('Teachers are required'),
    duration: Yup.number().required('Duration is required').min(1).max(4).integer(),
};


const Component = ({ department, year, semester, isOpen, setIsOpen, isLoading: l, onSubmit }) => {
    const { loading, request: fetchCourses, } = useAPI(coursesAPI.allByDepartment, { errorMessage: "could not load data", onComplete: (e) => { setCourses(e.map(({ id, name }) => ({ id, label: name }))) } });
    const { loading: loading1, request: fetchTeachers } = useAPI(teachersAPI.allByDepartmentSlot, { errorMessage: "could not load data", onComplete: (e) => { setTeachers(e.map(({ id, user: { fullname }, slot }) => ({ id, label: fullname, slot }))) } });
    const isLoading = l || loading || loading1;
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        if (department && isOpen && year && semester) { fetchCourses(department); fetchTeachers(department, year, semester) }
    }, [department, isOpen, year, semester]);
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            duration: "",
            teachers: [],
        },
        onSubmit: (payload) => {
            if (onSubmit) {
                onSubmit({ ...payload });
                setIsOpen(false);
                resetForm();
            }
        },
    });

    return (
        <>


            <Modal
                onClose={() => {
                    setIsOpen(false);
                }}
                isOpen={isOpen}
            >
                <ModalHeader>Add Class</ModalHeader>
                <ModalBody>
                    <FormControl label="Course" error={courses && courses.length ? errors.course : "No Courses found"}>
                        <Select
                            disabled={isLoading}
                            id="course"

                            options={courses}
                            onChange={({ value }) => {
                                if (value && value.length) {
                                    setFieldValue("course", value);
                                }
                            }}
                            value={values.course}


                        />
                    </FormControl>
                    <FormControl label="Type" error={errors.type}>
                        <Select
                            disabled={isLoading}
                            id="type"

                            options={[{ id: "LECTURE", label: "Lecture" }, { id: "LAB", label: "Lab" }]}
                            onChange={({ value }) => {
                                if (value && value.length) {
                                    setFieldValue("type", value);
                                }
                            }}
                            value={values.type}

                        />
                    </FormControl>
                    <FormControl label="Duration in hours" error={errors.duration}>
                        <Input
                            disabled={isLoading}
                            id="duration"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.duration}

                        />
                    </FormControl>
                    <FormControl label="Allowed Teachers" error={teachers && teachers.length ? errors.teachers : "No Teachers found"}>
                        <Select
                            disabled={isLoading}
                            id="teachers"
                            multi
                            options={teachers}
                            onChange={({ value }) => {
                                if (value && value.length) {
                                    setFieldValue("teachers", value);
                                }
                            }}
                            value={values.teachers}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>

                    <ModalButton
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Add
                    </ModalButton>
                </ModalFooter>
            </Modal>



        </>
    );
};
export default Component;
