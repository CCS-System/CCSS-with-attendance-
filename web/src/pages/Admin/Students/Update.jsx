import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import Create from "./components/Create";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/students"
const Page = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        request(id);
    }, [])
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { request: updateRequest, loading: updateLoading } = useAPI(theAPI.update, { errorMessage: "Could not update!", successMessage: "Updated successfully!", onComplete: () => { navigate(-1) } });
    return <Content title="Update Student" error={error} isLoading={loading} >
        {data && <Create fullname={data.fullname} department={[{ label: data.section.department.name, id: data.section.department.id }]} section={[{ label: data.section.name, id: data.section.id }]} studentId={data.studentId} isLoading={loading || updateLoading} onSubmit={(payload) => { updateRequest(id, { ...payload }) }} />}
    </Content >
}
export default Page;