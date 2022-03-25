import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../../components/PaginatedTable";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/students";


const Page = ({ id }) => {
    const { request, loading, data, error } = useAPI(theAPI.allBySection);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, studentId, fullname, section: { name: section, department: { id: department }, } }) => {
                rows.push([studentId, fullname, department, section, [{ action: "view", handler: () => { navigate(`/app/admin/student/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request(id) }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Students" columns={["Student ID", "Full name", "Department", "Section", "Actions"]} data={toRow(data)} actions={[{ name: "Create Student", link: "/app/admin/create-student" }]} />
    </>


}
export default Page;