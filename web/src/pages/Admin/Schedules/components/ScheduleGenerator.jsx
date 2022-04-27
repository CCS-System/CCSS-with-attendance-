import React, { useState, useEffect } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button"
import CreateClass from "./CreateClass";
import ClassCard from "./ClassCard";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from "baseui/select";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ListHeading } from 'baseui/list';
import useAPI from "../../../../hooks/useAPI";
import departmentsAPI from "../../../../api/departments";
import sectionsAPI from "../../../../api/sections";
import classroomsAPI from "../../../../api/classrooms";
import {
    List,
    arrayMove,
    arrayRemove
} from "baseui/dnd-list";

const commonSchema = {
    department: Yup.array().required('Department is required'),
    sections: Yup.array().required('Sections are required'),
    classrooms: Yup.array().required('Classrooms are required'),
    classes: Yup.array().required('Classes are required'),
    year: Yup.string().required('Year is required'),
    semester: Yup.string().required('Semester is required'),
};

const Component = ({ isLoading: l, onSubmit }) => {
    const { loading, request: fetchDepartments, } = useAPI(departmentsAPI.all, { onComplete: (e) => { setDepartments(e.map(({ id, name }) => ({ id, label: name }))) } });
    const { loading: loading1, request: fetchSections } = useAPI(sectionsAPI.allByDepartmentSlot, { onComplete: (e) => { sectionsFilter(e) } });
    const { loading: loading2, request: fetchClassrooms } = useAPI(classroomsAPI.allByDepartmentSlot, { onComplete: (e) => { classroomsFilter(e) } });
    const isLoading = l || loading || loading1 || loading2;
    const sectionsFilter = (e) => {
        const list = e.map(({ id, name, year, slot }) => ({ id, label: `${name} [${year} batch]`, slot }));
        setSections(list);
        setFieldValue("sections", list);
    }
    const classroomsFilter = (e) => {
        const list = e.map(({ id, name, type, slot }) => ({ id, label: `${name} [${type}]`, type, slot }));
        setClassrooms(list);
        setFieldValue("classrooms", list);
    }

    const [isOpen, setIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [sections, setSections] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    const mapToCardProps = ({ teachers, course, type, duration }) => {
        return { course: course[0].label, teachers, type: type[0].label, duration };
    }

    const mapToCard = (e) => {
        const props = mapToCardProps(e);
        return <ClassCard {...props} />
    }

    useEffect(() => { fetchDepartments(); }, [])
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
            department: [],
            classes: [],
            sections: [],
            classrooms: [],
            year: "",
            semester: ""
        },
        onSubmit: (payload) => {
            if (onSubmit) {
                const { department, classes, classrooms, year, semester } = payload;
                const mappedClasses = classes.map(mapToCardProps);
                const classesWithClassroom = mappedClasses.map((prop) => {
                    const filteredClassrooms = classrooms.filter(({ type }) => type.toLowerCase() === prop.type.toLowerCase());
                    return { ...prop, classrooms: filteredClassrooms, year, semester };
                })
                onSubmit({ ...payload, department: department[0].id, classes: classesWithClassroom });
            }
        },
    });

    return (
        <>
            <CreateClass department={values?.department[0]?.id} year={values?.year} semester={values?.semester} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} onSubmit={(e) => { setFieldValue("classes", [...values.classes, e]) }} />
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
                            fetchSections(value[0].id, values.year, values.semester)
                            fetchClassrooms(value[0].id, values.year, values.semester)
                        }
                    }}
                    value={values.department}
                />
            </FormControl>


            <FormControl label="Sections" error={sections && sections.length ? errors.sections : "No Sections found"}>
                <Select
                    disabled={isLoading}
                    id="sections"
                    multi
                    options={sections}
                    onChange={({ value }) => {
                        if (value && value.length) {
                            setFieldValue("sections", value);
                        }
                    }}
                    value={values.sections}
                />
            </FormControl>
            <FormControl label="Classrooms" error={classrooms && classrooms.length ? errors.classrooms : "No Classrooms found"}>
                <Select
                    disabled={isLoading}
                    id="classrooms"
                    multi
                    options={classrooms}
                    onChange={({ value }) => {
                        if (value && value.length) {
                            setFieldValue("classrooms", value);
                        }
                    }}
                    value={values.classrooms}
                />
            </FormControl>
            <ListHeading
                heading="Classes"
                endEnhancer={() => (

                    <Button
                        disabled={!values.department || !values.department.length || !values.year || !values.semester}
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        Add Class
                    </Button>
                )}
                maxLines={1}
            />
            <List
                items={values.classes.map(mapToCard)}
                removable
                onChange={({ oldIndex, newIndex }) =>
                    setFieldValue("classes",
                        newIndex === -1
                            ? arrayRemove(values.classes, oldIndex)
                            : arrayMove(values.classes, oldIndex, newIndex)
                    )
                }
            />


            <Button
                type="button"
                id="generate"
                disabled={values.classes.length < 1}
                onClick={() => {
                    handleSubmit();
                }}
                isLoading={isLoading}
            >
                Generate Schedule
            </Button>
        </>
    );
};
export default Component;
