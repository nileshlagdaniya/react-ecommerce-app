// src/App.tsx

import { Navigate, Route, Routes } from "react-router-dom";

import AdminRoute from "./routes/AdminRoute";

import { Toaster } from "sonner";
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/user/UserDashboard";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
