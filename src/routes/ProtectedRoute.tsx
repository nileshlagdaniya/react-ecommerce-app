import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <>Loading...</>;

  return user ? children : <Navigate to="/login" replace />;
}
