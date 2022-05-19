import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import Create from "./components/Create";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/classrooms"
const Page = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        request(id);
    }, [])
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { request: updateRequest, loading: updateLoading } = useAPI(theAPI.update, { errorMessage: "Could not update!", successMessage: "Updated successfully!", onComplete: () => { navigate(-1) } });
    return <Content title="Update Classroom" error={error} isLoading={loading} >
        {data && <Create name={data.name} department={[{ label: data.department.name, id: data.department.id }]} type={[{ label: data.type, id: data.type.toUpperCase() }]} capacity={data.capacity} isLoading={loading || updateLoading} onSubmit={(payload) => { updateRequest(id, { ...payload }) }} />}
    </Content >
}
export default Page;