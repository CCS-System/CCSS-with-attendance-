import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../Admin/Attendance/components/AttendanceDetail";
const Page = () => {
    const { id } = useParams();

    return <>
        <Detail id={id} actions={[{ name: "Take Attendance", link: `/app/teacher/create-attendance/${id}` }]} />
    </>


}
export default Page;

