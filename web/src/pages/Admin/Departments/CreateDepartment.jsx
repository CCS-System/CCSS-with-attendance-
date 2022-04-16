import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import CreateDepartment from "./components/CreateDepartment";
import useAPI from "../../../hooks/useAPI";
import departmentsAPI from "../../../api/departments"
const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(departmentsAPI.create, { errorMessage: "Could create department", successMessage: "Department Created", onComplete: () => { navigate(-1) } });
    return <Content title="Create Department" >
        <CreateDepartment isLoading={loading} onSubmit={(payload) => { request({ ...payload }) }} />
    </Content >
}
export default Page;