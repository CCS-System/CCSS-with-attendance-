import React from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const commonSchema = {
    id: Yup.string().required('Department ID is required'),
    name: Yup.string().required('Name is required'),
};

const Component = ({
    name: initialName,
    id: initialID,
    disableId,
    onSubmit,
    isLoading,
}) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        validationSchema: Yup.object().shape({ ...commonSchema }),
        initialValues: {
            name: initialName || "",
            id: initialID || "",
        },
        onSubmit: (payload) => {
            if (payload.name && payload.id) {
                if (onSubmit) {
                    onSubmit(payload);
                }
            }
        },
    });

    return (
        <>

            <FormControl label="Department ID" error={errors.id}>
                <Input
                    disabled={isLoading || disableId}
                    id="id"
                    type="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                />
            </FormControl>
            <FormControl label="Name" error={errors.name}>
                <Input
                    disabled={isLoading}
                    id="name"
                    type="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
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
