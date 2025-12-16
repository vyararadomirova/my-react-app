import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard(props) {
  const token = localStorage.getItem("accessToken");
  const children = props.children;

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return children;
}
