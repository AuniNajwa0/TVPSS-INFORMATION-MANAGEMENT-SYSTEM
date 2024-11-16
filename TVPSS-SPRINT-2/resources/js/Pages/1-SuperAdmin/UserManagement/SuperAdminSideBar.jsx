import React from 'react';
import { FaCog, FaSignOutAlt, FaTh, FaUsers } from 'react-icons/fa';
import { Link } from '@inertiajs/react';  // Inertia Link

function SuperAdminSideBar() {
  return (
    <div className="fixed top-0 left-0 w-[310px] bg-gradient-to-t from-[#1f2a44] to-[#28334a] text-white h-screen p-6 border-r border-gray-300 flex flex-col">
      {/* Logo Section */}
      <div className="mb-10">
        <img
          src="/assets/LogoTVPSS.svg"
          alt="TVPSS Logo"
          className="mx-auto w-24 h-24 transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
                      
        <li className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a2130] rounded-lg text-lg transition-all duration-200 ease-in-out">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <FaTh className="text-2xl" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>          
        <li className="flex items-center space-x-3 px-4 py-3 bg-[#1f2a44] text-white rounded-lg text-lg hover:bg-[#1a2130] transition-all duration-200 ease-in-out">
          <Link href="/listUser" className="flex items-center space-x-3">
            <FaUsers className="text-2xl" />
            <span className="font-medium">Pengurusan Pengguna</span>
          </Link>
        </li>
      </ul>

      {/* Bottom Items */}
      <div className="mt-auto space-y-6">
        <li className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a2130] rounded-lg text-lg transition-all duration-200 ease-in-out">
          <FaCog className="text-2xl" />
          <span className="font-medium">Tetapan</span>
        </li>
        <li className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a2130] rounded-lg text-lg transition-all duration-200 ease-in-out">
          <FaSignOutAlt className="text-2xl" />
          <span className="font-medium">Log Keluar</span>
        </li>
      </div>
    </div>
  );
}

export default SuperAdminSideBar;
