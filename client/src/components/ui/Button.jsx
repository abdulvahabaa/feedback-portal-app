export const Button = ({
    children,
    className = "",
    variant = "default",
    type = "button",
    ...props
  }) => {
    const base =
      "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };
  
    return (
      <button
        type={type}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  