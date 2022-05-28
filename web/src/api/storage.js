import client from "./client";

export default {
    upload: (formData) => client.post("storage", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    get: (path) => client.get(`storage/${path}`),
}