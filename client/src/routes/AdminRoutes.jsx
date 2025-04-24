import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/common/NotFound";
import AdminAuth from "../pages/admin/AdminAuth";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAuth />} />

      <Route
        path="/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
