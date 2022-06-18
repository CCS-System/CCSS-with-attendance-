import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "baseui/tag";
import PaginatedTable from "../../../components/PaginatedTable";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/teachers";


const Page = () => {
    const { request, loading, data, error } = useAPI(theAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, user: { fullname, email }, departments }) => {
                rows.push([fullname, email, departments.reduce((prev, current) => (prev + " " + current.id), ""), [{ action: "view", handler: () => { navigate(`/app/admin/teacher/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Teachers" columns={["Full Name", "Email", "Departments", "Actions"]} data={toRow(data)} actions={[{ name: "Create Teacher", link: "/app/admin/create-teacher" }]} />
    </>


}
export default Page;