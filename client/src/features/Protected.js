import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Protected = ({ children }) => {
  const navigate = useNavigate();
  const existingUser = localStorage.getItem("user");
  if (!existingUser) {
    navigate("/login");
  } else {
    navigate("/");
  }
  return children;
};

export default Protected;
