import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/common/NotFound";
import AdminAuth from "../pages/admin/AdminAuth";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.adminState);

  const isAllowedRole = role === "admin";

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          isAuthenticated && isAllowedRole ? <AdminDashboard /> : <AdminAuth />
        }
      />
      <Route
        path="/*"
        element={
          <Routes>
            <Route
              path="dashboard"
              element={
                isAuthenticated && isAllowedRole ? (
                  <AdminDashboard />
                ) : (
                  <AdminAuth />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
