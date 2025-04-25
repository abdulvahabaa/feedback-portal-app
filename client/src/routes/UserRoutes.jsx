import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/users/Home";
import NotFound from "../pages/common/NotFound";
import AuthPage from "../pages/users/AuthPage";

const UserRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.userState);

  const isAllowedRole = role === "admin" || role === "client";

  return (
    <Routes>
      {/* Auth page route */}
      <Route
        path="/auth"
        element={
          isAuthenticated && isAllowedRole ? (
            <Navigate to="/" replace />
          ) : (
            <AuthPage />
          )
        }
      />

      {/* Protected home route */}
      <Route
        path="/"
        element={
          isAuthenticated && isAllowedRole ? (
            <Home />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
