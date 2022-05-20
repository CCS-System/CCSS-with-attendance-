import React from "react";
import { FaCalendar, FaList } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Schedule',
        icon: <FaCalendar style={{ marginRight: '0.5rem' }} />,
        to: "/app/teacher"
    },
    {
        title: 'Attendance',
        icon: <FaList style={{ marginRight: '0.5rem' }} />,
        to: "/app/teacher/attendances"
    },

]


const Layout = () => {
    return <Dashboard menu={menu} title="College Class Scheduling System">
        <RoleRoute role="TEACHER" />
    </Dashboard>
}
export default Layout;