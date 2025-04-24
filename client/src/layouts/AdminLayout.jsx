import { useState } from "react";
import { Sidebar } from "../components/admin/DashSidebar";
import { Navbar } from "../components/admin/DashNavbar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar - Fixed */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* Navbar - Fixed at the top */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Scrollable Main Content */}
        <main className={` mt-1 p-2 overflow-y-auto mx-2 h-[calc(100vh-4rem)]`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
