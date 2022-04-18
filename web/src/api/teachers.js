import client from "./client";

export default {
    all: () => client.get("teachers"),
    allSlot: () => client.get("teachers/slot"),
    allByDepartment: (id) => client.get(`teachers/department/${id}`),
    allByDepartmentSlot: (id, year, semester) => client.get(`teachers/department-slot/${id}?year=${year}&semester=${semester}`),
    getById: (id) => client.get(`teachers/${id}`),
    delete: (id) => client.delete(`teachers/${id}`),
    create: (data) => client.post("teachers", data),
    update: (id, data) => client.put(`teachers/${id}`, data),
}