import React from "react";
import Navbar from "../components/users/Navbar/Navbar";
import Footer from "../components/users/Footer/Footer";


const UserLayout = ({ children }) => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Top Navigation Bar */}
      <header>
        <Navbar />
      
     </header>

      {/* Main Content Area */}
      <main className="mt-13">{children}</main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
