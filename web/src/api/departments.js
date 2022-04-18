import client from "./client";

export default {
    all: () => client.get("departments"),
    getById: (id) => client.get(`departments/${id}`),
    delete: (id) => client.delete(`departments/${id}`),
    create: (data) => client.post("departments", data),
    update: (id, data) => client.put(`departments/${id}`, data),
}