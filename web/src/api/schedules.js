import client from "./client";

export default {
    all: () => client.get("schedules"),
    getById: (id) => client.get(`schedules/${id}`),
    create: (data) => client.post("schedules", data),
    bulk: (data) => client.post("schedules/bulk", data),
    allBySection: (sectionId) => client.get(`schedules/section/${sectionId}`),
    allByClassroom: (classroomId) => client.get(`schedules/classroom/${classroomId}`),
    allByTeacher: (teacher) => client.get(`schedules/teacher/${teacher}`),
    delete: (id) => client.delete(`schedules/${id}`),
    update: (id, data) => client.put(`schedules/${id}`, data),
}