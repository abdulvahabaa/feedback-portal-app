import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/users/Home";
import NotFound from "../pages/common/NotFound";
import AuthPage from "../pages/users/AuthPage";


const UserRoutes = () => {
  return (

    <Routes>

      <Route path="/" element={<Home />} />
      
      <Route path="/auth" element={<AuthPage />} />


      {/* Catch-All Route for Invalid User Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  
  );
};

export default UserRoutes;
