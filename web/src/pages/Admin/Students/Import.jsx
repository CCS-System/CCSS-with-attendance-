import React from "react";
import { useNavigate, } from "react-router-dom";
import Content from "../../../components/Content"
import Import from "./components/Import";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/students"
const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(theAPI.import, { errorMessage: "Create failed!", successMessage: "Created succesfully!", onComplete: () => { navigate(-1) } });
    return <Content title="Import Students"  >
        <Import isLoading={loading} onSubmit={(e) => { request(e) }} />
    </Content >
}
export default Page;