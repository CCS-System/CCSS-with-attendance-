import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Create from "./components/Create";

const Page = () => {
    const { id } = useParams();
    return <Create id={id} />
}
export default Page;