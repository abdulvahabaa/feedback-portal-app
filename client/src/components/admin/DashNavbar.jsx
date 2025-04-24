import { FaBell, FaSearch, FaSun } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";

export const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md h-16 flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <button
          className="text-violet-700 hover:text-violet-900 hover:cursor-pointer hover:scale-110"
          onClick={toggleSidebar}
        >
          <FiSidebar size={24} />
        </button>
        <span className="text-gray-400">/</span>
        <h1 className="text-violet-700 font-semibold text-lg">Dashboard</h1>
      </div>
    </header>
  );
};
