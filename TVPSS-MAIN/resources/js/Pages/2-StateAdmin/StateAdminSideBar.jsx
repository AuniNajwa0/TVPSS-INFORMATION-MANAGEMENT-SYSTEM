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
    <div className="fixed top-0 left-0 w-1/6 bg-gray-100 text-gray-800 h-screen p-4 border-r border-gray-300 flex flex-col">
      {/* Logo Section */}
      <div className="mb-2 text-center">
        <img src="/assets/LogoTVPSS.svg" alt="TVPSS Logo" className="w-[100] h-[100]" />
      </div>

      {/* Menu Items */}
      <ul className="space-y-2 flex-1">
        <li className="flex items-center space-x-2 px-4 py-2 bg-[#455185] text-white rounded-md text-lg">
          <Link href="/dashboardState"> {/* Using Inertia Link */}
            <FaTh />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-lg">
          <Link href="/certificate-Template-List"> {/* Using Inertia Link */}
            <FaPrint />
            <span>Jana Sijil Pelajar</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-lg">
          <Link href="/tvpssInfo"> {/* Using Inertia Link */}
            <FaInfoCircle />
            <span>Informasi TVPSS Sekolah</span>
          </Link>
        </li>
      </ul>

      {/* Bottom Items */}
      <div className="mt-2 space-y-4">
        <li className="flex items-center space-x-2 px-4 py-2 bg-[#455185] text-white hover:bg-blue-800 rounded-md text-lg">
          <FaCog />
          <span>Tetapan</span>
        </li>
        <li className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-lg">
          <FaSignOutAlt />
          <span>Log Keluar</span>
        </li>
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
