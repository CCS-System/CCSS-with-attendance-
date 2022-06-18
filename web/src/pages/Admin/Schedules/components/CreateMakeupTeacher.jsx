import React, { useState, useEffect } from 'react';
import { FormControl } from "baseui/form-control";
import { DatePicker } from 'baseui/datepicker';
import { Input } from "baseui/input";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
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
import departmentsAPI from "../../../../api/departments";
import sectionsAPI from "../../../../api/sections";
import classroomsAPI from "../../../../api/classrooms";
import { OR, findAllPossibleSlots, slotLookup } from "./scheduler";
const commonSchema = {
    course: Yup.array().required('Course is required'),
    type: Yup.array().required('Course type is required'),
    teachers: Yup.array().required('Teachers are required'),
    year: Yup.number().required('Year is required'),
    date: Yup.string().required('Date is required'),
    semester: Yup.number().required('Semester is required'),
    department: Yup.array().required('Department is required'),
    sections: Yup.array().required('Sections are required'),
    classrooms: Yup.array().required('Classrooms are required'),
    weekday: Yup.number().required('Weekday is required'),
    slots: Yup.array().required('Time slot is required'),
    duration: Yup.number().required('Duration is required').min(1).max(4).integer(),
};

const weekdayMap = [-1, 0, 1, 2, 3, 4, 5];
const Component = ({ teacher: initialTeacher, department: initialDepartment, section: initialSection, year: initialYear, semester: initialSemester, isOpen, setIsOpen, isLoading: l, onSubmit }) => {
    const { loading: loading1, request: fetchDepartments, } = useAPI(departmentsAPI.all, { onComplete: (e) => { setDepartments(e.map(({ id, name }) => ({ id, label: name }))) } });
    const { loading: loading2, request: fetchSections } = useAPI(sectionsAPI.allByDepartmentSlot, { onComplete: (e) => { sectionsFilter(e) } });
    const { loading: loading3, request: fetchClassrooms } = useAPI(classroomsAPI.allByDepartmentSlot, { onComplete: (e) => { classroomsFilter(e) } });
    const sectionsFilter = (e) => {
        const list = e.map(({ id, name, year, slot }) => ({ id, label: `${name} [${year} batch]`, slot }));
        setSections(list);
    }
    const classroomsFilter = (e) => {
        const list = e.map(({ id, name, type, slot }) => ({ id, label: `${name} [${type}]`, type, slot }));
        setClassrooms(list);
    }

    const getAvaliableSlots = (weekday, duration) => {
        if (values.classrooms.length && values.teachers.length && values.sections.length) {
            const classroom = values.classrooms[0].slot[weekday];
            const section = values.sections[0].slot[weekday];
            const teacher = values.teachers[0].slot[weekday];
            const avalibility = OR(classroom, teacher, section);
            const allSlots = findAllPossibleSlots(duration, avalibility);
            const options = [];
            for (const slot of allSlots) {
                const startDate = new Date(`2018-11-01T${slotLookup[slot[0]]}`);
                const endDate = new Date(`2018-11-01T${slotLookup[slot[slot.length - 1] + 1]}`);
                options.push({ id: slot.join(","), label: `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}` })

            }
            setPossibleSlots(options);
        }
    };

    const { loading: loading4, request: fetchCourses, } = useAPI(coursesAPI.allByDepartment, { errorMessage: "could not load data", onComplete: (e) => { setCourses(e.map(({ id, name }) => ({ id, label: name }))) } });
    const { loading: loading5, request: fetchTeachers } = useAPI(teachersAPI.allByDepartmentSlot, { errorMessage: "could not load data", onComplete: (e) => { setTeachers(e.map(({ id, user: { fullname }, slot }) => ({ id, label: fullname, slot }))) } });
    const isLoading = l || loading1 || loading2 || loading3 || loading4 || loading5;
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [possibleSlots, setPossibleSlots] = useState([]);
    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
            if (initialDepartment && initialDepartment.length && initialYear && initialSemester) {
                fetchSections(initialDepartment[0].id, initialYear, initialSemester);
                fetchClassrooms(initialDepartment[0].id, initialYear, initialSemester);
                fetchTeachers(initialDepartment[0].id, initialYear, initialSemester);
                fetchCourses(initialDepartment[0].id)

            }
        } else { resetForm() }
    }, [isOpen]);


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
            year: initialYear || "",
            semester: initialSemester || "",
            teachers: initialTeacher || [],
            classrooms: [],
            sections: initialSection || [],
            department: initialDepartment || [],
            weekday: ""
        },

        onSubmit: (payload) => {
            if (onSubmit) {
                const course = payload.course[0].label;
                const type = payload.type[0].id;
                const section = payload.sections[0].id;
                const year = payload.year;
                const semester = payload.semester;
                const teacher = payload.teachers[0].id;
                const classroom = payload.classrooms[0].id;
                const weekday = payload.weekday;
                const date = payload.date;
                const slots = payload.slots[0].id;
                if (type !== payload.classrooms[0].type) {
                    if (confirm(`The course you are adding is a ${type} class but the classroom is ${payload.classrooms[0].type}. Are you sure you want to continue?`)) {
                        onSubmit({
                            name: `[MAKEUP] ${course} [${type}]`,
                            section,
                            year,
                            date,
                            semester,
                            teacher,
                            classroom,
                            slots,
                            weekday,
                            makeup: true
                        });
                    }
                }
                else {

                    onSubmit({
                        name: `[MAKEUP] ${course} [${type}]`,
                        section,
                        year,
                        date,
                        semester,
                        teacher,
                        classroom,
                        slots,
                        weekday,
                        makeup: true
                    });

                }

            }
        },
    });
    useEffect(() => {
        if (initialSection) {
            const found = sections.find(({ id }) => id === initialSection[0].id);
            if (found)
                setFieldValue("sections", [found]);
        }
        if (initialTeacher) {
            const found = teachers.find(({ id }) => id === initialTeacher[0].id);
            if (found)
                setFieldValue("teachers", [found]);
        }
    }, [sections, teachers]);
    useEffect(() => {
        if (values.duration && values.weekday) {
            getAvaliableSlots(values.weekday, values.duration);
        }
    }, [values]);

    return (
        <>


            <Modal
                onClose={() => {
                    setIsOpen(false);
                }}
                isOpen={isOpen}
                size="auto"
            >
                <ModalHeader>Add Makeup Class</ModalHeader>
                <ModalBody>


                    <FlexGrid
                        flexGridColumnCount={2}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        justifyItems="space-between"
                    >
                        <FlexGridItem>

                            <FormControl label="Year" error={errors.year}>
                                <Input
                                    disabled={isLoading}
                                    id="year"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.year}

                                />
                            </FormControl>
                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Semester" error={errors.semester}>
                                <Input
                                    disabled={isLoading}
                                    id="semester"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.semester}

                                />
                            </FormControl>
                        </FlexGridItem>
                    </FlexGrid>
                    <FormControl label="Department" error={departments && departments.length ? errors.department : "No Departments found"}>
                        <Select
                            disabled={isLoading || !values.year || !values.semester}
                            id="department"
                            options={departments}
                            onChange={({ value }) => {
                                if (value && value.length) {
                                    setFieldValue("department", value);
                                    setFieldValue("sections", []);
                                    setFieldValue("classrooms", []);
                                    fetchSections(value[0].id, values.year, values.semester);
                                    fetchClassrooms(value[0].id, values.year, values.semester);
                                    fetchTeachers(value[0].id, values.year, values.semester);
                                    fetchCourses(value[0].id)
                                }
                            }}
                            value={values.department}
                        />
                    </FormControl>


                    <FlexGrid
                        flexGridColumnCount={2}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        justifyItems="space-between"
                    >
                        <FlexGridItem>
                            <FormControl label="Section" error={sections && sections.length ? errors.sections : "No Sections found"}>
                                <Select
                                    disabled={isLoading}
                                    id="sections"

                                    options={sections}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("sections", value);
                                        }
                                    }}
                                    value={values.sections}
                                />
                            </FormControl>

                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Classroom" error={classrooms && classrooms.length ? errors.classrooms : "No Classrooms found"}>
                                <Select
                                    disabled={isLoading}
                                    id="classrooms"

                                    options={classrooms}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("classrooms", value);
                                        }
                                    }}
                                    value={values.classrooms}
                                />
                            </FormControl>
                        </FlexGridItem>
                        <FlexGridItem>
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
                        </FlexGridItem>
                        <FlexGridItem>
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
                        </FlexGridItem>
                        <FlexGridItem>
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
                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Teacher" error={teachers && teachers.length ? errors.teachers : "No Teachers found"}>
                                <Select
                                    disabled={isLoading || true}
                                    id="teachers"

                                    options={teachers}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("teachers", value);
                                        }
                                    }}
                                    value={values.teachers}
                                />
                            </FormControl>
                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Date" error={errors.date || errors.weekday}>
                                <DatePicker
                                    disabled={isLoading}

                                    onChange={({ date }) => {
                                        setFieldValue("date", date);
                                        setFieldValue("weekday", weekdayMap[new Date(date).getDay()]);
                                    }}
                                />
                            </FormControl>

                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Time Slot" error={errors.slots}>
                                <Select
                                    disabled={isLoading}
                                    id="slots"

                                    options={possibleSlots}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("slots", value);

                                        }
                                    }}
                                    value={values.slots}
                                />
                            </FormControl>
                        </FlexGridItem>
                    </FlexGrid>



                </ModalBody>
                <ModalFooter>

                    <ModalButton
                        overrides={{ BaseButton: { style: { width: "100%" } } }}
                        isLoading={isLoading}

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
