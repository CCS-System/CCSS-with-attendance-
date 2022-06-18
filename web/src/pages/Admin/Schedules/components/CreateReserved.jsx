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
    teachers: Yup.array().required('Teachers are required'),
    year: Yup.number().required('Year is required'),
    semester: Yup.number().required('Semester is required'),
    weekday: Yup.array().required('Weekday is required'),
    startSlot: Yup.array().required('Start time is required'),
    endSlot: Yup.array().required('End time is required'),
};

const weekdayMap = [-1, 0, 1, 2, 3, 4, 5];
const Component = ({ teacher: initialTeacher, year: initialYear, semester: initialSemester, isOpen, setIsOpen, isLoading: l, onSubmit }) => {



    const { loading: loading5, request: fetchTeachers } = useAPI(teachersAPI.all, { errorMessage: "could not load data", onComplete: (e) => { setTeachers(e.map(({ id, user: { fullname }, slot }) => ({ id, label: fullname, slot }))) } });
    const isLoading = l || loading5;

    const [teachers, setTeachers] = useState([]);
    const [startSlots, setStartSlots] = useState([]);
    const [endSlots, setEndSlots] = useState([]);
    useEffect(() => {
        if (isOpen) {
            const options = [];
            for (const slot in slotLookup) {
                const startDate = new Date(`2018-11-01T${slotLookup[slot]}`);
                options.push({ id: parseInt(slot), label: `${startDate.toLocaleTimeString()}` })

            }
            setStartSlots(options);

            fetchTeachers();


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

            year: initialYear || "",
            semester: initialSemester || "",
            teachers: initialTeacher || [],
            startSlot: [],
            endSlot: [],
            weekday: []
        },

        onSubmit: (payload) => {
            if (onSubmit) {
                const year = payload.year;
                const semester = payload.semester;
                const teacher = payload.teachers[0].id;
                const weekday = payload.weekday[0].id;
                const startSlot = payload.startSlot[0].id;
                const endSlot = payload.endSlot[0].id;
                const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
                onSubmit({
                    name: `Reserved Slot`,
                    
                    year,
                    semester,
                    teacher,
                    
                    slots: range(startSlot, endSlot).join(","),
                    weekday,
                    reserved: true
                });



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
                size="auto"
            >
                <ModalHeader>Add Reserved Time</ModalHeader>
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

                    <FlexGrid
                        flexGridColumnCount={2}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        justifyItems="space-between"
                    >

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
                            <FlexGridItem>
                                <FormControl label="Week Day" error={errors.weekday}>
                                    <Select
                                        disabled={isLoading}
                                        id="weekday"

                                        options={[{ id: 0, label: "Monday" }, { id: 1, label: "Tuesday" }, { id: 2, label: "Wednsday" }, { id: 3, label: "Thursday" }, { id: 4, label: "Friday" }, { id: 5, label: "Saturday" }]}
                                        onChange={({ value }) => {
                                            if (value && value.length) {
                                                setFieldValue("weekday", value);


                                            }
                                        }}
                                        value={values.weekday}
                                    />
                                </FormControl>
                            </FlexGridItem>
                        </FlexGridItem>
                        <FlexGridItem>
                            <FormControl label="Start time" error={errors.startSlot}>
                                <Select
                                    disabled={isLoading}
                                    id="startSlot"

                                    options={startSlots}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("startSlot", value);
                                            console.log({ startSlots, value })
                                            setEndSlots(startSlots.filter(({ id }) => id > value[0].id));

                                        }
                                    }}
                                    value={values.startSlot}
                                />
                            </FormControl>
                        </FlexGridItem>

                        <FlexGridItem>
                            <FormControl label="End time" error={errors.endSlot}>
                                <Select
                                    disabled={isLoading || values.startSlot.length < 1}
                                    id="endSlot"

                                    options={endSlots}
                                    onChange={({ value }) => {
                                        if (value && value.length) {
                                            setFieldValue("endSlot", value);

                                        }
                                    }}
                                    value={values.endSlot}
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
