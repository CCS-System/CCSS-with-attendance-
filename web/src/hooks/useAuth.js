import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from './useAPI';
import authAPI from "../api/auth";

export const UserAuthContext = React.createContext({});

const useAuth = () => {
    const navigate = useNavigate();
    const { metadata, setMetadata } = useContext(UserAuthContext)
    const onComplete = (data) => {
        localStorage.setItem("auth", JSON.stringify(data));
        setMetadata(data);
        navigate("/app");
    }
    const requestConfig = { errorMessage: "Something went wrong", onComplete }
    const login = useAPI(authAPI.login, requestConfig);
    const { request: teacher, loading: teacherLoading } = useAPI(authAPI.registerTeacher, requestConfig);
    const signupLoading = teacherLoading;
    const signupRequest = (payload) => {
        switch (payload.role) {
            case "TEACHER":
                teacher(payload);
                break;
            default:
                alert("Something went wrong!")
        }
    }
    const logout = () => { localStorage.removeItem("auth"); setMetadata({}); navigate("/") };
    return {
        metadata,
        login,
        signup: { request: signupRequest, loading: signupLoading },
        logout
    };
}

export default useAuth;