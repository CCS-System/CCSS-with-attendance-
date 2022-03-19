import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/sections";


const Page = () => {
    const { request, loading, data, error } = useAPI(theAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, name, year, department: { name: department } }) => {
                rows.push([name, year, department, [{ action: "view", handler: () => { navigate(`/app/admin/section/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Sections" columns={["Name", "Year", "Department", "Actions"]} data={toRow(data)} actions={[{ name: "Create Section", link: "/app/admin/create-section" }]} />
    </>


}
export default Page;