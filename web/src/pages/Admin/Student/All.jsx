import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/teachers";


const Page = () => {
    const { request, loading, data, error } = useAPI(theAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, user: { fullname, email }, department: { name: department } }) => {
                rows.push([fullname, email, department, [{ action: "view", handler: () => { navigate(`/app/admin/student/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Student" columns={["Full Name", "Email", "Department", "Actions"]} data={toRow(data)} actions={[{ name: "Create Student", link: "/app/admin/create-student" }]} />
    </>


}
export default Page;