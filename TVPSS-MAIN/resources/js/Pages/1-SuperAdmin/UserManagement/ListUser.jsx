import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import SuperAdminSideBar from '../SuperAdminSideBar';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ListUser({ auth, users, pagination, selectedRole }) {
    // State variables
    const [rowsPerPage, setRowsPerPage] = useState(pagination.per_page);  // Default rows per page
    const [currentPage, setCurrentPage] = useState(pagination.current_page);
    const [selectedRoleState, setSelectedRole] = useState(selectedRole);  // New state for selected role

    // Accessing the 'data' array from the 'users' prop
    const usersData = users.data;

    // Filter users by role
    const filteredUsers = selectedRoleState
        ? usersData.filter(user => user.role === Number(selectedRoleState))  // Ensure comparison with number
        : usersData;

    // Pagination logic
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;

    // Get users for the current page manually without using slice
    const currentUsers = [];
    for (let i = indexOfFirstUser; i < indexOfLastUser; i++) {
        if (filteredUsers[i]) {
            currentUsers.push(filteredUsers[i]);
        }
    }

    // Log filtered users and current users for debugging
    useEffect(() => {
        console.log("Users data:", usersData);  // Log the users data from the prop
        console.log("Filtered users:", filteredUsers);  // Log filtered users after applying role filter
        console.log("Current users:", currentUsers);  // Log current page's users
    }, [usersData, filteredUsers, currentPage]);

    // Handle page change
    const nextPage = () => {
        if (currentPage < pagination.last_page) {
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

    // Handle user deletion
    const handleDelete = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await Inertia.delete(`/users/${userId}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengurusan Pengguna
                </h2>
            }
        >
            <Head title="Pengurusan Pengguna" />

            <div className="flex">
                <div className="w-1/6 p-4 text-white min-h-screen">
                    <SuperAdminSideBar />
                </div>

                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Semua Pengguna</h3>
                        <button
                            className="bg-[#455185] hover:bg-[#3C4565] text-white rounded-md px-4 py-2 shadow-md"
                            onClick={() => Inertia.visit('/users/create')}  // Use Inertia.js navigation here
                        >
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
                                    value={selectedRoleState}
                                    onChange={handleRoleChange}
                                    className="px-4 py-2 bg-white text-[#455185] rounded-md border border-[#455185] shadow-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3C4565] hover:ring-2"
                                >
                                    <option value="">Semua</option>
                                    <option value="0">Super Admin</option>
                                    <option value="1">State Admin</option>
                                    <option value="2">PPD Admin</option>
                                    <option value="3">School Admin</option>
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
                                {currentUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">Tiada Data Ditemui</td>
                                    </tr>
                                ) : (
                                    currentUsers.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="border-b p-4">{index + 1}</td>
                                            <td className="border-b p-4">{user.name}</td>
                                            <td className="border-b p-4">{user.email}</td>
                                            <td className="border-b p-4">{user.state}</td>
                                            <td className="border-b p-4">
                                                <span className={`px-2 py-1 rounded-full text-white ${getRoleColor(user.role)}`}>
                                                    {getRoleLabel(user.role)}
                                                </span>
                                            </td>
                                            <td className="border-b p-4">
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => Inertia.visit(`/users/${user.id}/edit`)}  // Use Inertia.js for edit navigation
                                                        className="text-yellow-500 hover:text-yellow-700"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <button onClick={prevPage} className="text-[#455185] hover:text-[#3C4565]">
                                    Prev
                                </button>
                                <span className="mx-2">
                                    {currentPage} of {Math.ceil(filteredUsers.length / rowsPerPage)}
                                </span>
                                <button onClick={nextPage} className="text-[#455185] hover:text-[#3C4565]">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper function to return color based on the role
const getRoleColor = (role) => {
    switch (role) {
        case 0: return 'bg-blue-600';   // Super Admin
        case 1: return 'bg-green-600';  // State Admin
        case 2: return 'bg-purple-600'; // PPD Admin
        case 3: return 'bg-yellow-600'; // School Admin
        default: return 'bg-gray-600';
    }
};

// Helper function to return label based on the role
const getRoleLabel = (role) => {
    switch (role) {
        case 0: return 'Super Admin';
        case 1: return 'State Admin';
        case 2: return 'PPD Admin';
        case 3: return 'School Admin';
        default: return 'Unknown';
    }
};
