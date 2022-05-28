import client from "./client";

export default {
    all: () => client.get("attendances"),
    allBySchedule: (id) => client.get(`attendances/schedule/${id}`),
    allByStudentId: (studentId) => client.get(`attendances/student/${studentId}`),
    create: (data) => client.post("attendances", data),
}