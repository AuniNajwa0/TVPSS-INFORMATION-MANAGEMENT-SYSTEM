import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import SuperAdminSideBar from './SuperAdminSideBar';
import { useState } from 'react';

export default function Dashboard() {
    // Dummy data (Replace with real data)
    const allUsers = [
        { id: 1, name: "Ahmad bin Mohamad", email: "ahmad.mohamad@moe-dl.edu.my", state: "Perlis", role: "SUPER ADMIN" },
        { id: 2, name: "Chong Wei Jie", email: "chong.wei.jie@moe-dl.edu.my", state: "Terengganu", role: "ADMIN PPD" },
        { id: 3, name: "Emily Davis", email: "emily.davis@moe-dl.edu.my", state: "Perak", role: "ADMIN SEKOLAH" },
        { id: 4, name: "Jane Smith", email: "jane.smith@moe-dl.edu.my", state: "Selangor", role: "ADMIN STATE" },
        { id: 5, name: "John Doe", email: "john.doe@moe-dl.edu.my", state: "Johor", role: "SUPER ADMIN" },
        { id: 6, name: "John Doe", email: "john.doe@moe-dl.edu.my", state: "Johor", role: "SUPER ADMIN" },
        { id: 7, name: "Alice Williams", email: "alice.williams@moe-dl.edu.my", state: "Kedah", role: "ADMIN PPD" },
        { id: 8, name: "Bob Martin", email: "bob.martin@moe-dl.edu.my", state: "Penang", role: "ADMIN SEKOLAH" },
        { id: 9, name: "Charlie Brown", email: "charlie.brown@moe-dl.edu.my", state: "Melaka", role: "ADMIN STATE" },
        { id: 10, name: "Diana Prince", email: "diana.prince@moe-dl.edu.my", state: "Sarawak", role: "SUPER ADMIN" },
        { id: 11, name: "Peter Parker", email: "peter.parker@moe-dl.edu.my", state: "Sabah", role: "ADMIN PPD" },
    ];

    // State variables
    const [rowsPerPage, setRowsPerPage] = useState(10);  // Default rows per page
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState('');  // New state for selected role

    // Filter users by role
    const filteredUsers = selectedRole 
        ? allUsers.filter(user => user.role === selectedRole)
        : allUsers;

    // Calculate the data to display
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page change
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);  // Reset to first page when rows per page changes
    };

    // Handle role filter change
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setCurrentPage(1);  // Reset to first page when role filter changes
    };

    // Delete confirmation handler
    const handleDelete = (userId) => {
        const confirmed = window.confirm("Padam Pengguna?");
        if (confirmed) {
            console.log(`${userId} Telah dipadamkan`);
            // Add the delete functionality here, such as making an API call to delete the user.
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengurusan Pengguna
                </h2>
            }
        >
            <Head title="Pengurusan Pengguna" />

            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 p-8 text-white min-h-screen">
                    <SuperAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Semua Pengguna</h3>
                        <button className="bg-[#455185] hover:bg-[#3C4565] text-white rounded-md px-4 py-2 shadow-md">
                            Tambah Pengguna Baharu
                        </button>
                    </div>

                    <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white rounded shadow-md">
                        {/* Search */}
                        <div className="flex items-center mb-4 justify-between">
                            <div className="flex items-center space-x-2 w-full max-w-xs">
                                <FaFilter className="text-gray-500 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Cari Pengguna..."
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                                />
                            </div>

                            {/* Role Filter Dropdown */}
                            <div className="flex items-center space-x-4">
                                <label htmlFor="roleFilter" className="text-sm font-medium">Jenis Pengguna :</label>
                                <select
                                    id="roleFilter"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="px-4 py-2 bg-white text-[#455185] rounded-md border border-[#455185] shadow-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3C4565] hover:ring-2"
                                >
                                    <option value="">Semua</option>
                                    <option value="SUPER ADMIN">Super Admin</option>
                                    <option value="ADMIN PPD">PPD Admin</option>
                                    <option value="ADMIN SEKOLAH">School Admin</option>
                                    <option value="ADMIN STATE">State Admin</option>
                                </select>

                                <label htmlFor="rowsPerPage" className="text-sm font-medium">Bilangan Data :</label>
                                <select
                                    id="rowsPerPage"
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="px-7 py-2 bg-white text-[#455185] rounded-md border border-[#455185] shadow-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3C4565] hover:ring-2"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                        </div>

                        {/* User Table */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b p-4">Bil</th>
                                    <th className="border-b p-4">Nama Penuh</th>
                                    <th className="border-b p-4">Alamat Email</th>
                                    <th className="border-b p-4">Negeri</th>
                                    <th className="border-b p-4">Jenis Pengguna</th>
                                    <th className="border-b p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="border-b p-4">{index + 1 + indexOfFirstUser}</td>
                                        <td className="border-b p-4">{user.name}</td>
                                        <td className="border-b p-4">{user.email}</td>
                                        <td className="border-b p-4">{user.state}</td>
                                        <td className="border-b p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="border-b p-2">
                                            <button
                                                className="mr-4 text-blue-600 hover:text-blue-800"
                                                onClick={() => console.log(`Edit user with ID ${user.id}`)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="mr-4 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Section */}
                        <div className="flex justify-center items-center mt-6 space-x-4">
                            <button
                                onClick={prevPage}
                                className="p-2 bg-[#455185] text-white rounded-lg shadow-md hover:bg-[#3C4565] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                            >
                                <span className="text-xl">&lt;</span>
                            </button>

                            <span className="text-sm text-gray-600 font-semibold">
                                Halaman {currentPage} daripada {Math.ceil(filteredUsers.length / rowsPerPage)}
                            </span>

                            <button
                                onClick={nextPage}
                                className="p-2 bg-[#455185] text-white rounded-lg shadow-md hover:bg-[#3C4565] transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={currentPage === Math.ceil(filteredUsers.length / rowsPerPage)}
                            >
                                <span className="text-xl">&gt;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper function to assign colors based on role
function getRoleColor(role) {
    switch (role) {
        case "SUPER ADMIN":
            return "bg-purple-100 text-purple-900";
        case "ADMIN PPD":
            return "bg-pink-100 text-pink-900";
        case "ADMIN SEKOLAH":
            return "bg-yellow-100 text-yellow-900";
        case "ADMIN STATE":
            return "bg-green-100 text-green-900";
        default:
            return "bg-gray-300 text-gray-600";
    }
}
