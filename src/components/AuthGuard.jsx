import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx";

export default function AuthGuard(props) {
  const { accessToken } = useContext(AuthContext);
  const children = props.children;

  if (!accessToken) {
    return <Navigate to="/login"/>;
  }

  return children;
}
