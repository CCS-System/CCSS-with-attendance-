import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Schedule from "../Admin/Schedules/components/ScheduleFetch";

const Page = () => {
    const navigate = useNavigate();
    const { metadata: { id, fullname } } = useAuth();

    return (
        <>

            <Schedule removable teacher={[{ id, label: fullname }]} by="teacher" makeup reserved id={id} actions={[{ name: "Go to Details", handler: ({ id }) => { navigate(`/app/teacher/schedule/${id}`) } }]} />
        </>)
}
export default Page;