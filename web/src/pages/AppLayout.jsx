import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useStyletron } from "baseui"
const Layout = () => {
    const [css, theme] = useStyletron();
    const { metadata } = useAuth();
    return <div className={css({ background: "#EBF8FF" })}>
        {metadata && metadata.role ? <Outlet /> : <Navigate to="/login" replace />}
    </div>
}
export default Layout;