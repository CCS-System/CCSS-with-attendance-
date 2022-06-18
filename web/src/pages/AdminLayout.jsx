import React from "react";
import { FaChartPie, FaCalendar, FaBuilding, FaUsers, FaBook, FaDoorClosed, FaChalkboardTeacher } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Schedules',
        icon: <FaCalendar style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin"
    },
    {
        title: 'Departments',
        icon: <FaBuilding style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/departments"
    },
    {
        title: 'Sections',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/sections"
    },
    {
        title: 'Courses',
        icon: <FaBook style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/courses"
    },

    {
        title: 'Classrooms',
        icon: <FaDoorClosed style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/classrooms"
    },

    {
        title: 'Teachers',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/teachers"
    },

    {
        title: 'Students',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/students"
    },
    {
        title: 'Create Admin Account',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/new-admin"
    },
]


const Layout = () => {
    return <Dashboard menu={menu} title="College Class Scheduling System">
        <RoleRoute role="ADMIN" />
    </Dashboard>
}
export default Layout;