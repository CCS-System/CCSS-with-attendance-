import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/students";


const Page = () => {
    const { request, loading, data, error } = useAPI(theAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, studentId, fullname, year, section: { name: section, department: { id: department }, } }) => {
                rows.push([studentId, fullname, department, section, year, [{ action: "view", handler: () => { navigate(`/app/admin/student/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Students" columns={["Student ID", "Full name", "Department", "Section", "Year", "Actions"]} data={toRow(data)} actions={[{ name: "Add One", link: "/app/admin/create-student" }, { name: "Add Bulk", link: "/app/admin/create-students" },  { name: "Import", link: "/app/admin/import-students" }]} />
    </>


}
export default Page;