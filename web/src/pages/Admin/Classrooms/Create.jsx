import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../../components/Content"
import Create from "./components/Create";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/classrooms"
const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(theAPI.create, { errorMessage: "Create failed!", successMessage: "Created succesfully!", onComplete: () => { navigate(-1) } });
    return <Content title="Create Classroom" >
        <Create isLoading={loading} onSubmit={(payload) => { request({ ...payload }) }} />
    </Content >
}
export default Page;