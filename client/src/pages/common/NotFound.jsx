import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  console.log("NotFound Page Rendered!");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Oops! The page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
