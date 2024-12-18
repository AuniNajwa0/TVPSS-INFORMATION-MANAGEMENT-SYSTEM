import React, { useState } from "react";
import {
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaBars,
  FaTimes,
  FaTh,
  FaPrint,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";

function StateAdminSideBar() {
  const { url } = usePage(); // Get the current URL
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#455185] text-white p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-white text-gray-800 h-screen p-6 flex flex-col z-40 border-r border-gray-200 transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:w-[340px]`}
      >
        {/* Logo Section */}
        <div className="mb-10 flex justify-center">
          <img
            src="/assets/TVPSSLogo.jpeg"
            alt="TVPSS Logo"
            className="w-70 h-30 transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Menu Items */}
        <nav className="space-y-4 flex-1">
          <SidebarLink
            href="/dashboardState"
            icon={<FaTh size={20} />}
            label="Dashboard"
            active={url.startsWith("/dashboardState")}
          />

          <SidebarLink
            href="/certificate-Template-List"
            icon={<FaPrint size={20} />}
            label="Jana Sijil Pelajar"
            active={url.startsWith("/certificate-Template-List")}
          />

          <SidebarLink
            href="/listSchool"
            icon={<FaInfoCircle size={20} />}
            label="Informasi TVPSS Sekolah"
            active={url.startsWith("/listSchool")}
          />
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          <SidebarLink
            href="/settings"
            icon={<FaCog size={20} />}
            label="Tetapan"
            active={url.startsWith("/settings")}
          />

          {/* Log Out */}
          <div>
            <Link
              href={route("logout")}
              method="post"
              className="flex items-center space-x-4 py-3 px-5 text-gray-400 hover:text-red-500 transition-all duration-200"
            >
              <FaSignOutAlt size={20} />
              <span className="text-lg font-medium">Log Keluar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-5 py-5 px-5 rounded-2xl text-lg font-medium transition-all duration-200 ${
        active
          ? "bg-[#455185] text-white shadow-md" // Highlighted style
          : "hover:bg-gray-100 text-gray-400"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

export default StateAdminSideBar;
