import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import CreateDepartment from "./components/CreateDepartment";
import useAPI from "../../../hooks/useAPI";
import departmentsAPI from "../../../api/departments"
const Page = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        request(id);
    }, [])
    const { loading, request, error, data } = useAPI(departmentsAPI.getById);
    const { request: updateRequest, loading: updateLoading } = useAPI(departmentsAPI.update, { errorMessage: "Could not update department", successMessage: "Department Updated", onComplete: () => { navigate(-1) } });
    return <Content title="Update Department" error={error} isLoading={loading} >
        {data && <CreateDepartment disableId id={data.id} name={data.name} isLoading={loading || updateLoading} onSubmit={(payload) => { updateRequest(id, { ...payload }) }} />}
    </Content >
}
export default Page;