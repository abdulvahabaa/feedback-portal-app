import React, { useState } from "react";
import { GiStethoscope } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdFeedback } from "react-icons/md";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.userState);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-green-800 border-b border-gray-200 dark:border-gray-600">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-4 flex-grow">
            {/* Logo */}
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <MdFeedback  className="text-xl md:text-2xl text-amber-500" />
              <h1 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">
                Feedback Portal
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-36 md:w-56 lg:w-64">
              <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base md:text-lg" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md w-full outline-none text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Right Section - Location & Profile/Login */}
          <div className="flex items-center space-x-4">
           {isAuthenticated ? <FaUserCircle className="text-2xl text-blue-500" /> :( <FaUserCircle className="text-2xl text-red-500" />)}
            <button className="btn bg-amber-500">logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
