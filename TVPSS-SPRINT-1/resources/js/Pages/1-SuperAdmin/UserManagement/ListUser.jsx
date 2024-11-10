import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


const users = [
    { id: 1, name: "Ahmad bin Mohamad", email: "ahmad.mohamad@moe-dl.edu.my", state: "Perlis", role: "SUPER ADMIN" },
    { id: 2, name: "Chong Wei Jie", email: "chong.wei.jie@moe-dl.edu.my", state: "Terengganu", role: "ADMIN PPD" },
    { id: 3, name: "Emily Davis", email: "emily.davis@moe-dl.edu.my", state: "Perak", role: "ADMIN SEKOLAH" },
    { id: 4, name: "Jane Smith", email: "jane.smith@moe-dl.edu.my", state: "Selangor", role: "ADMIN STATE" },
    { id: 5, name: "John Doe", email: "john.doe@moe-dl.edu.my", state: "Johor", role: "SUPER ADMIN" },
    { id: 6, name: "Lee Siew Yen", email: "lee.siew.yen@moe-dl.edu.my", state: "Sabah", role: "ADMIN SEKOLAH" },
    { id: 7, name: "Lim Chee Seng", email: "lim.chee.seng@moe-dl.edu.my", state: "Sabah", role: "ADMIN PPD" },
    { id: 8, name: "Michael Johnson", email: "michael.johnson@moe-dl.edu.my", state: "Penang", role: "ADMIN PPD" },
];

const roles = ["Semua", "SUPER ADMIN", "ADMIN STATE", "ADMIN PPD", "ADMIN SEKOLAH"];

export default function Dashboard() {
    const [filterRole, setFilterRole] = useState("Semua");
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Filter users based on selected role
    const filteredUsers = filterRole === "Semua"
        ? users
        : users.filter(user => user.role === filterRole);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleRoleSelect = (role) => {
        setFilterRole(role);
        setDropdownOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Semua Pengguna
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Pengurusan Pengguna Semua Pengguna</h2>
                    <button className="bg-[#455185] text-white px-4 py-2 rounded-md hover:bg-[#3C4565]">
                        Tambah Pengguna Baharu
                    </button>
                </div>

                <div className="bg-white p-4 rounded-md shadow">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Cari Pengguna..."
                            className="border rounded-md p-2 flex-grow"
                        />
                        <div className="relative ml-4">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center p-2 border rounded-md text-gray-700 hover:bg-gray-200"
                            >
                                Filter <FaFilter className="ml-2" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                                    {roles.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleSelect(role)}
                                            className={`block px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-100 ${
                                                filterRole === role ? "font-bold bg-gray-200" : ""
                                            }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 border-b">Bil</th>
                                <th className="py-2 border-b">Nama Penuh</th>
                                <th className="py-2 border-b">Alamat Email</th>
                                <th className="py-2 border-b">Negeri</th>
                                <th className="py-2 border-b">Jenis Pengguna</th>
                                <th className="py-2 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-2 border-b">{index + 1}</td>
                                    <td className="py-2 border-b">{user.name}</td>
                                    <td className="py-2 border-b">{user.email}</td>
                                    <td className="py-2 border-b">{user.state}</td>
                                    <td className="py-2 border-b">
                                        <span className={`px-2 py-1 rounded-full text-white ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-2 border-b flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper function to set role color
const getRoleColor = (role) => {
    switch (role) {
        case 'SUPER ADMIN':
            return 'bg-purple-500';
        case 'ADMIN PPD':
            return 'bg-blue-300';
        case 'ADMIN SEKOLAH':
            return 'bg-purple-300';
        case 'ADMIN STATE':
            return 'bg-yellow-300';
        default:
            return 'bg-gray-300';
    }
};
