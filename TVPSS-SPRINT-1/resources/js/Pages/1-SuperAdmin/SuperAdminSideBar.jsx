import { FaTh, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function SuperAdminSideBar() {
    return (
        <div className="w-1/8 bg-white text-gray-400 min-h-screen p-4 border-r border-gray-200 fixed">
            {/* Logo Section */}
            <div className="mb-6 text-center">
                <img src="/public/assets/tvpsslogo.svg" alt="TVPSS Logo" className="mx-auto mb-2 w-24 h-24" />
                <p className="text-sm">Management Information System</p>
            </div>

            {/* Menu Items */}
            <ul className="space-y-2">
                <li className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-gray-800 text-lg">
                    <FaTh />
                    <span>Dashboard</span>
                </li>
                <li className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-gray-800 text-lg">
                    <FaUsers />
                    <span>Pengurusan Pengguna</span>
                </li>
            </ul>

            {/* Bottom Items */}
            <div className="mt-4 space-y-4">
                <li className="flex items-center space-x-2 px-4 py-2 bg-[#455185] text-white rounded-md text-lg">
                    <FaCog />
                    <span>Tetapan</span>
                </li>
                <li className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-gray-800 text-lg">
                    <FaSignOutAlt />
                    <span>Log Keluar</span>
                </li>
            </div>
        </div>
    );
}
