import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/common/NotFound";
import AdminAuth from "../pages/admin/AdminAuth";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AdminAuth />} />
      <Route
        path="/*"
        element={
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
