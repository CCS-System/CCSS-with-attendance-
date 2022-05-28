import client from "./client";

export default {
    all: () => client.get("classrooms"),
    allSlot: () => client.get("classrooms/slot"),
    allByDepartmentSlot: (id, year, semester) => client.get(`classrooms/department-slot/${id}?year=${year}&semester=${semester}`),
    getById: (id) => client.get(`classrooms/${id}`),
    delete: (id) => client.delete(`classrooms/${id}`),
    create: (data) => client.post("classrooms", data),
    update: (id, data) => client.put(`classrooms/${id}`, data),
}