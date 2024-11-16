import React from 'react';
import { FaCog, FaSignOutAlt, FaTh, FaUsers } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react'; // Inertia Link and usePage

function SuperAdminSideBar() {
  const { url } = usePage(); // Get the current URL from Inertia.js

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
        {/* Dashboard */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/dashboard' ? 'bg-[#1f2a44] text-white' : 'text-gray-300 hover:bg-[#1a2130]'
          }`}
        >
          <Link href="/dashboard" className="flex items-center space-x-3">
            <FaTh className="text-2xl" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>

        {/* Pengurusan Pengguna */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/listUser' ? 'bg-[#1f2a44] text-white' : 'text-gray-300 hover:bg-[#1a2130]'
          }`}
        >
          <Link href="/listUser" className="flex items-center space-x-3">
            <FaUsers className="text-2xl" />
            <span className="font-medium">Pengurusan Pengguna</span>
          </Link>
        </li>
      </ul>

      {/* Bottom Items */}
      <div className="mt-auto space-y-6">
        {/* Tetapan */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/profileSuperAdmin' ? 'bg-[#1f2a44] text-white' : 'text-gray-300 hover:bg-[#1a2130]'
          }`}
        >
          <Link href="/profileSuperAdmin" className="flex items-center space-x-3">
            <FaCog className="text-2xl" />
            <span className="font-medium">Tetapan</span>
          </Link>
        </li>

        {/* Log Keluar */}
        <li className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a2130] rounded-lg text-lg transition-all duration-200 ease-in-out">
          <Link href={route('logout')} method="post" className="flex items-center space-x-3">
            <FaSignOutAlt className="text-2xl" />
            <span className="font-medium">Log Keluar</span>
          </Link>
        </li>
      </div>
    </div>
  );
}

export default SuperAdminSideBar;
