import client from "./client";

export default {
    all: () => client.get("courses"),
    allByDepartment: (id) => client.get(`courses/department/${id}`),
    getById: (id) => client.get(`courses/${id}`),
    delete: (id) => client.delete(`courses/${id}`),
    create: (data) => client.post("courses", data),
    update: (id, data) => client.put(`courses/${id}`, data),
}