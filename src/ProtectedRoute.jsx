import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage } from "./srcapi/Api";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  let Cmp = props.Cmp;

  useEffect(() => {
    if (!localStorage.getItem("api_token")) {
      navigate("/login");
    }
  }, [navigate]);

  return <div><Cmp /></div>;
};

export default ProtectedRoute;
