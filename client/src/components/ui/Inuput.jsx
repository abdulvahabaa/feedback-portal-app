import React from "react";

export const Input = ({
  className = "",
  ...props
}) => {
  const base =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <input
      className={`${base} ${className}`}
      {...props}
    />
  );
};
