import React from 'react';
import { FormControl } from "baseui/form-control";
import { DatePicker } from 'baseui/datepicker';
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from "baseui/select";

const commonSchema = {
    date: Yup.string().required('Date is required'),
    absent: Yup.array().required('Attendance is required'),
};

const Component = ({
    date: initialDate,
    absent: initialAbsent,
    onSubmit,
    isLoading,
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            date: initialDate || "",
            absent: initialAbsent || "",
        },
        onSubmit: (payload) => {
            if (payload.date && payload.absent) {
                if (onSubmit) {
                    const absent = payload.absent[0].id
                    onSubmit({ ...payload, absent });
                }
            }
        },
    });

    return (
        <>
            <FormControl label="Date" error={errors.date}>
                <DatePicker
                    disabled={isLoading}
                    onChange={({ date }) => setFieldValue("date", date)}
                />
            </FormControl>
            <FormControl label="Attendance" error={errors.absent}>
                <Select
                    disabled={isLoading}
                    id="absent"
                    options={[
                        { label: "Absent", id: true },
                        { label: "Present", id: false },
                    ]}
                    onChange={({ value }) => {
                        if (value && value.length)
                            setFieldValue("absent", value);
                    }}
                    value={values.absent}
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
                Submit Attendance
            </Button>
        </>
    );
};
export default Component;
