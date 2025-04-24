import React from "react";
import AdminLoginForm from "../../components/admin/AdminLoginForm";

const AdminAuth = () => {
  return (
    <div className="bg-gray-900 flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminAuth;
