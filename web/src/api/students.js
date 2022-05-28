import client from "./client";

export default {
    all: () => client.get("students"),
    allBySection: (id) => client.get(`students/section/${id}`),
    getById: (id) => client.get(`students/${id}`),
    delete: (id) => client.delete(`students/${id}`),
    create: (data) => client.post("students", data),
    createBulk: (data) => client.post("students/bulk", data),
    update: (id, data) => client.put(`students/${id}`, data),
}