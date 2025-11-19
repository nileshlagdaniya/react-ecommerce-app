import React from "react";
import { useAuth } from "../features/auth/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const { isAdmin, isLoggedIn, loading, initialized } = useAuth();

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  // Not logged in → login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but NOT admin → access denied page
  if (!isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default AdminRoute;
