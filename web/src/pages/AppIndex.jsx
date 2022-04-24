import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Layout = () => {
    const { metadata: { role } } = useAuth();
    switch (role) {
        case "TEACHER":
            return <Navigate to="/app/teacher" replace />;
        case "ADMIN":
            return <Navigate to="/app/admin" replace />;
        default:
            return <Outlet />
    }

}
export default Layout;