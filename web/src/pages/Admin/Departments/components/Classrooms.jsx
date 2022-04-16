import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../../components/PaginatedTable";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/classrooms";


const Page = ({ id }) => {
    const { request, loading, data, error } = useAPI(theAPI.allByDepartmentSlot);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, name, capacity, type, department: { name: department } }) => {
                rows.push([name, capacity, type, department, [{ action: "view", handler: () => { navigate(`/app/admin/classroom/${id}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request(id) }, [])
    return <>
        <PaginatedTable height="300px" error={error} isLoading={loading} title="Classrooms" columns={["Name", "Capacity", "Type", "Department", "Actions"]} data={toRow(data)} actions={[{ name: "Create Classroom", link: "/app/admin/create-classroom" }]} />
    </>


}
export default Page;