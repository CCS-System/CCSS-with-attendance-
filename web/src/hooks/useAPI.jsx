import React, { useState } from "react";
import { useSnackbar } from "baseui/snackbar";
import Check from "baseui/icon/check";
import Alert from "baseui/icon/alert";
export default (apiFunc, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueue } = useSnackbar();

    const request = async (...args) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
            if (options) {
                if (options.onComplete) {
                    options.onComplete(result.data);
                }
                if (options.successMessage) {
                    enqueue({
                        overrides: { Content: { style: ({ $theme }) => ({ backgroundColor: $theme.colors.positive }) } },
                        message: options.successMessage,
                        startEnhancer: ({ size }) => <Check size={size} />,
                    })
                }
            }
        } catch (err) {
            const getErrorMessage = () => {
                if (err) {
                    if (err.response && err.response.data)
                        return err.response.data.message;
                    return err.message;
                }
                return "Unexpected Error!"
            }
            setError(getErrorMessage());
            if (options) {
                if (options.onError) {
                    options.onError(err);
                }
                if (options.errorMessage) {
                    enqueue({
                        overrides: { Content: { style: ({ $theme }) => ({ backgroundColor: $theme.colors.negative }) } },
                        message: `${options.errorMessage}: ${getErrorMessage()}`,
                        startEnhancer: ({ size }) => <Alert size={size} />,
                    })
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request
    };
};