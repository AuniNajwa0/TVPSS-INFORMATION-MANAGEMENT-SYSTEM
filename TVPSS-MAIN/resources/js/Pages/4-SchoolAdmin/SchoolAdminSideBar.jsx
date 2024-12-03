import React from 'react';
import { FaCheckCircle, FaCog, FaInfoCircle, FaPaperPlane, FaPencilAlt, FaSignOutAlt, FaSortNumericDown, FaTh } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react'; // Inertia Link and usePage

function SchoolAdminSideBar() {
  const { url } = usePage(); // Get the current URL from Inertia.js

  return (
    <div className="fixed top-0 left-0 w-[310px] bg-white text-white h-screen p-6 border-r border-gray-300 flex flex-col">
      {/* Logo Section */}
      <div className="mb-6">
        <img
          src="/assets/LogoTVPSS.svg"
          alt="TVPSS Logo"
          className="ml-full w-30 h-30 transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Separator Line */}
      <hr className="border-t border-gray-300 mb-6" /> {/* Add line here */}

      {/* Menu Items */}
      <ul className="space-y-4">
        {/* Dashboard */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/dashboardSchool' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/dashboardSchool" className="flex items-center space-x-3">
            <FaTh className="text-2xl" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>

        {/* Permohonan Krew */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/permohonanKrew' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/permohonanKrew" className="flex items-center space-x-3">
            <FaPencilAlt className="text-2xl" />
            <span className="font-medium">Permohonan Krew</span>
          </Link>
        </li>

        {/* Pencapaian Pelajar */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/pencapaianPelajar' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/pencapaianPelajar" className="flex items-center space-x-3">
            <FaCheckCircle className="text-2xl" />
            <span className="font-medium">Pencapaian Pelajar</span>
          </Link>
        </li>

        {/* Informasi Sekolah */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/informasiSekolah' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/updateSchool" className="flex items-center space-x-3">
            <FaInfoCircle className="text-2xl" />
            <span className="font-medium">Informasi Sekolah</span>
          </Link>
        </li>

        {/* Bilangan Barang */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/listEquipment' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/listEquipment" className="flex items-center space-x-3">
            <FaSortNumericDown className="text-2xl" />
            <span className="font-medium">Bilangan Barang</span>
          </Link>
        </li>

        {/* Submit Versi TVPSS */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/submitVersiTVPSS' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/updateSchoolTVPSSVersion" className="flex items-center space-x-3">
            <FaPaperPlane className="text-2xl" />
            <span className="font-medium">Submit Versi TVPSS</span>
          </Link>
        </li>
      </ul>

      {/* Bottom Items */}
      <div className="mt-auto space-y-6">
        {/* Tetapan */}
        <li
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out ${
            url === '/settingsSchoolAdmin' ? 'bg-gradient-to-r from-[#455185] to-[#008080] text-white' : 'text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080]'
          }`}
        >
          <Link href="/settingsSchoolAdmin" className="flex items-center space-x-3">
            <FaCog className="text-2xl" />
            <span className="font-medium">Tetapan</span>
          </Link>
        </li>

        {/* Log Keluar */}
        <li className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gradient-to-r from-[#455185] to-[#008080] rounded-lg text-lg transition-all duration-200 ease-in-out">
          <Link href={route('logout')} method="post" className="flex items-center space-x-3">
            <FaSignOutAlt className="text-2xl" />
            <span className="font-medium">Log Keluar</span>
          </Link>
        </li>
      </div>
    </div>
  );
}

export default SchoolAdminSideBar;
