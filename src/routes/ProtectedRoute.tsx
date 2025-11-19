import React from "react";
import { useAuth } from "../features/auth/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const { initialized, loading, isLoggedIn } = useAuth();

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedRoute;
