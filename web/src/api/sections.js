import client from "./client";

export default {
    all: () => client.get("sections"),
    allSlot: () => client.get("sections/slot"),
    allByDepartmentSlot: (id, year, semester) => client.get(`sections/department-slot/${id}?year=${year}&semester=${semester}`),
    getById: (id) => client.get(`sections/${id}`),
    delete: (id) => client.delete(`sections/${id}`),
    create: (data) => client.post("sections", data),
    update: (id, data) => client.put(`sections/${id}`, data),
}