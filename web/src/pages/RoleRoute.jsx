import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Layout = ({ role: requiredRole }) => {
    const { metadata: { role } } = useAuth();
    return (<>{requiredRole === role ? <Outlet /> : <Navigate to="/unauthorized" replace />}</>);
}
export default Layout;