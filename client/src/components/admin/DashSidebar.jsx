import { FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdOutlineDashboard,
  MdOutlineHelpOutline,
} from "react-icons/md";
import HoverTooltip from "../ui/Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "../../redux/slices/adminSlice";

export const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(setAdminLogout());
      navigate("/admin/auth");
    };

  return (
    <aside
      className={`bg-violet-700 text-white rounded-r-2xl h-full p-4 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Logo & Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-green-400 p-2">
          <MdAdminPanelSettings />
        </div>
        {isOpen && <p className="font-bold">ADMIN PANEL</p>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul>
          <li
            onClick={() => navigate("/admin/dashboard")}
            className="p-2 rounded flex items-center gap-2 hover:bg-violet-600 cursor-pointer hover:font-semibold"
          >
            <HoverTooltip text="Dashboard">
              <MdOutlineDashboard />
            </HoverTooltip>
            {isOpen && <span>Dashboard</span>}
          </li>
          <li
            onClick={() => navigate("/admin/analytics")}
            className="p-2 rounded flex items-center gap-2 hover:bg-violet-600 cursor-pointer hover:font-semibold"
          >
            <HoverTooltip text="Analytics">
              <FaChartBar />
            </HoverTooltip>
            {isOpen && <span>Analytics</span>}
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-2">
        <div
          onClick={() => navigate("/admin/settings")}
          className="p-2 rounded flex items-center gap-2 hover:bg-violet-600 cursor-pointer text-sm"
        >
          <HoverTooltip text="Settings">
            <IoSettingsOutline />
          </HoverTooltip>
          {isOpen && <span>Settings</span>}
        </div>
        <div
          onClick={() => navigate("/admin/help")}
          className="p-2 rounded flex items-center gap-2 hover:bg-violet-600 cursor-pointer text-sm"
        >
          <HoverTooltip text="Help">
            <MdOutlineHelpOutline />
          </HoverTooltip>
          {isOpen && <span>Get Help</span>}
        </div>
        <div onClick={handleLogout} className="p-2 rounded flex items-center gap-2 bg-yellow-500 cursor-pointer text-sm">
         
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
};
