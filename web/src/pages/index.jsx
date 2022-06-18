import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
    SnackbarProvider,
    PLACEMENT,
} from 'baseui/snackbar';

import MainLayout from "./MainLayout";
import AppLayout from "./AppLayout";
import AdminLayout from "./AdminLayout";
import TeacherLayout from "./TeacherLayout";
import AppIndex from "./AppIndex";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import UnAuthorized from "./UnAuthorized";
import AdminSchedules from "./Admin/Schedules/Schedules";
import AdminSchedulesOne from "./Admin/Schedules/One";

import AdminDepartments from "./Admin/Departments/Departments";
import AdminDepartment from "./Admin/Departments/Department";
import AdminUpdateDepartment from "./Admin/Departments/UpdateDepartment";
import AdminCreateDepartment from "./Admin/Departments/CreateDepartment";
import AdminGenerateSchedule from "./Admin/Schedules/GenerateSchedule";

import AdminSectionsAll from "./Admin/Sections/All";
import AdminSectionsOne from "./Admin/Sections/One";
import AdminSectionsUpdate from "./Admin/Sections/Update";
import AdminSectionsCreate from "./Admin/Sections/Create";

import AdminCoursesAll from "./Admin/Courses/All";
import AdminCoursesOne from "./Admin/Courses/One";
import AdminCoursesUpdate from "./Admin/Courses/Update";
import AdminCoursesCreate from "./Admin/Courses/Create";


import AdminClassroomsAll from "./Admin/Classrooms/All";
import AdminClassroomsOne from "./Admin/Classrooms/One";
import AdminClassroomsUpdate from "./Admin/Classrooms/Update";
import AdminClassroomsCreate from "./Admin/Classrooms/Create";

import AdminTeachersAll from "./Admin/Teachers/All";
import AdminTeachersOne from "./Admin/Teachers/One";
import AdminTeachersUpdate from "./Admin/Teachers/Update";
import AdminTeachersCreate from "./Admin/Teachers/Create";

import AdminStudentsAll from "./Admin/Students/All";
import AdminStudentsOne from "./Admin/Students/One";
import AdminStudentsUpdate from "./Admin/Students/Update";
import AdminStudentsCreate from "./Admin/Students/Create";
import AdminStudentsCreateBulk from "./Admin/Students/CreateBulk";
import AdminStudentsImport from "./Admin/Students/Import";


import AdminAttendanceAll from "./Admin/Attendance/All";
import AdminAttendanceOne from "./Admin/Attendance/One";
import AdminAttendanceCreate from "./Admin/Attendance/Create";


import TeacherDashboard from "./Teacher/Dashboard";
import TeacherScheduleOne from "./Teacher/One";
import TeacherAttendance from "./Teacher/Attendances";
import TeacherAttendanceOne from "./Teacher/AttendanceOne";

import AdminCreateAdmin from "./Admin/CreateAdmin";


import { UserAuthContext } from "../hooks/useAuth";
const App = () => {
    const [metadata, setMetadata] = useState(JSON.parse(localStorage.getItem("auth")) || {});
    return (
        <UserAuthContext.Provider value={{ metadata, setMetadata }}>
            <SnackbarProvider placement={PLACEMENT.topRight}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        {/* <Route path="signup" element={<Signup />} /> */}
                        <Route path="unauthorized" element={<UnAuthorized />} />
                    </Route>
                    <Route path="/app" element={<AppLayout />}>
                        <Route index element={<AppIndex />} />
                        <Route path="admin" element={<AdminLayout />}>

                            <Route index element={<AdminSchedules />} />
                            <Route path="generate-schedule" element={<AdminGenerateSchedule />} />
                            <Route path="schedule/:id" element={<AdminSchedulesOne />} />


                            <Route path="departments" element={<AdminDepartments />} />
                            <Route path="department/:id" element={<AdminDepartment />} />
                            <Route path="update-department/:id" element={<AdminUpdateDepartment />} />
                            <Route path="create-department" element={<AdminCreateDepartment />} />

                            <Route path="sections" element={<AdminSectionsAll />} />
                            <Route path="section/:id" element={<AdminSectionsOne />} />
                            <Route path="update-section/:id" element={<AdminSectionsUpdate />} />
                            <Route path="create-section" element={<AdminSectionsCreate />} />

                            <Route path="courses" element={<AdminCoursesAll />} />
                            <Route path="course/:id" element={<AdminCoursesOne />} />
                            <Route path="update-course/:id" element={<AdminCoursesUpdate />} />
                            <Route path="create-course" element={<AdminCoursesCreate />} />

                            <Route path="classrooms" element={<AdminClassroomsAll />} />
                            <Route path="classroom/:id" element={<AdminClassroomsOne />} />
                            <Route path="update-classroom/:id" element={<AdminClassroomsUpdate />} />
                            <Route path="create-classroom" element={<AdminClassroomsCreate />} />

                            <Route path="teachers" element={<AdminTeachersAll />} />
                            <Route path="teacher/:id" element={<AdminTeachersOne />} />
                            <Route path="update-teacher/:id" element={<AdminTeachersUpdate />} />
                            <Route path="create-teacher" element={<AdminTeachersCreate />} />

                            <Route path="students" element={<AdminStudentsAll />} />
                            <Route path="student/:id" element={<AdminStudentsOne />} />
                            <Route path="update-student/:id" element={<AdminStudentsUpdate />} />
                            <Route path="create-student" element={<AdminStudentsCreate />} />
                            <Route path="create-students" element={<AdminStudentsCreateBulk />} />
                            <Route path="import-students" element={<AdminStudentsImport />} />

                            <Route path="attendances/:id" element={<AdminAttendanceAll />} />
                            <Route path="attendance/:id" element={<AdminAttendanceOne />} />
                            <Route path="create-attendance/:id" element={<AdminAttendanceCreate />} />
                            <Route path="new-admin" element={<AdminCreateAdmin />} />


                        </Route>

                        <Route path="teacher" element={<TeacherLayout />}>
                            <Route index element={<TeacherDashboard />} />
                            <Route path="schedule/:id" element={<TeacherScheduleOne />} />
                            <Route path="create-attendance/:id" element={<AdminAttendanceCreate />} />
                            <Route path="attendances" element={<TeacherAttendance />} />
                            <Route path="attendance/:id" element={<TeacherAttendanceOne />} />

                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SnackbarProvider>
        </UserAuthContext.Provider>
    );
};

export default App;
