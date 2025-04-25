import React, { useState } from "react";
import adminImg from "../../assets/images/admin.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/authApis";
import { setAdminLogin } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";

export function AdminLoginForm({ className, ...props }) {
  const [formDataAdmin, setFormDataAdmin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormDataAdmin({ ...formDataAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({
        email: formDataAdmin.email,
        password: formDataAdmin.password,
      });

      if (response.token && response.admin) {
        dispatch(
          setAdminLogin({
            admin: response.admin,
            token: response.token,
            role: response.admin.role,
          })
        );
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid login credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Heading */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back Admin
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Login to your account
                </p>
              </div>

              {/* Email Input */}
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  name="email"
                  required
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  value={formDataAdmin.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  required
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  value={formDataAdmin.password}
                  onChange={handleChange}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full p-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 transition hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>

          {/* Image Section (Hidden on Small Screens) */}
          <div className="relative hidden bg-gray-100 dark:bg-gray-800 md:block">
            <img
              src={adminImg}
              className="absolute inset-0 h-full w-full object-cover dark:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginForm;
