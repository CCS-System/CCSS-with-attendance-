import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Detail from "./components/ScheduleDetail";
const Page = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return <>
        <Detail id={id} removable actions={[{ name: "Take Attendance", link: `/app/admin/create-attendance/${id}` }]} />
    </>


}
export default Page;

