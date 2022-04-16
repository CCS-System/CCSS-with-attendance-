import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../../components/PaginatedTable";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/teachers";


const Page = ({ id }) => {
    const { request, loading, data, error } = useAPI(theAPI.allByDepartment);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, user: { fullname, email }, department: { name: department } }) => {
                rows.push([fullname, email, department, [{ action: "view", handler: () => { navigate(`/app/admin/teacher/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request(id) }, [])
    return <>
        <PaginatedTable height="300px" error={error} isLoading={loading} title="Teachers" columns={["Full Name", "Email", "Department", "Actions"]} data={toRow(data)} actions={[{ name: "Create Teacher", link: "/app/admin/create-teacher" }]} />
    </>


}
export default Page;