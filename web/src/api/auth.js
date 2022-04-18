import client from "./client";

export default {
    login: (data) => client.post("auth/login", data),
    registerTeacher: (data) => client.post("auth/register/teacher", data),
    registerAdmin: (data) => client.post("auth/register/admin", data),
}