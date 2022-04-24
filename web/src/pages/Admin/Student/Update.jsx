import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import Create from "./components/Update";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/teachers"
const Page = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        request(id);
    }, [])
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { request: updateRequest, loading: updateLoading } = useAPI(theAPI.update, { errorMessage: "Could not update!", successMessage: "Updated successfully!", onComplete: () => { navigate(-1) } });
    return <Content title="Update Teacher" error={error} loading={loading} >
        {data && <Create fullname={data.user.fullname} department={[{ label: data.department.name, id: data.department.id }]} isLoading={loading || updateLoading} onSubmit={(payload) => { updateRequest(id, { ...payload }) }} />}
    </Content >
}
export default Page;