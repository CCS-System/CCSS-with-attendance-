import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import useAPI from "../../../hooks/useAPI";
import departmentsAPI from "../../../api/departments";


const Page = () => {
    const { request, loading, data, error } = useAPI(departmentsAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, name }) => {
                rows.push([id, name, [{ action: "view", handler: () => { navigate(`/app/admin/department/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Departments" columns={["ID", "Name", "Actions"]} data={toRow(data)} actions={[{ name: "Create Department", link: "/app/admin/create-department" }]} />
    </>


}
export default Page;