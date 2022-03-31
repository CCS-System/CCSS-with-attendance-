import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Schedule from "../Admin/Schedules/components/ScheduleFetch";
const Page = () => {
    const navigate = useNavigate();
    const { metadata: { id } } = useAuth();
    return <Schedule by="teacher" title="Attendance" id={id} info="Click on a class to view attendance information" actions={[{ name: "Attendance", handler: ({ id }) => { navigate(`/app/teacher/attendance/${id}`) } }]} />

}
export default Page;