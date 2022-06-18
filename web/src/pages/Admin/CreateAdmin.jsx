import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import authAPI from "../../api/auth";
import AdminReg from "../../components/Registration/Admin";
const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(authAPI.registerAdmin, { successMessage: "Admin Account Created!", errorMessage: "Could not register account", onComplete: () => { navigate(-1) } })
    return <Content title="New Admin Account">
        <AdminReg isLoading={loading} onSubmit={(payload) => { request(payload) }} />
    </Content>


}
export default Page;