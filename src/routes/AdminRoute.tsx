import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import type { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <>Loading...</>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") return <Navigate to="/user" replace />;

  return children;
}
