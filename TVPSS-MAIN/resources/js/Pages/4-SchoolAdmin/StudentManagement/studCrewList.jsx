import React, { useState } from 'react';
import { Head, router, usePage } from "@inertiajs/react";
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import the necessary icons
import SchoolAdminSideBar from "../SchoolAdminSideBar"; // Import the sidebar component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Import the authenticated layout
import { Inertia } from "@inertiajs/inertia";

const StudCrewList = ({ studcrews, school }) => {
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5); // State for rows per page

    // Function to handle search
    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('studcrew.list'), { search });
    };

    // Function to handle rows per page change
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(e.target.value);
        Inertia.get(route('studcrew.list'), { search, rowsPerPage: e.target.value });
    };

    // Function to determine the status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-200 text-yellow-700';
            case 'Approved':
                return 'bg-green-200 text-green-700';
            case 'Rejected':
                return 'bg-red-200 text-red-700';
            default:
                return 'bg-gray-200 text-gray-600';
        }
    };

    // Function to handle export
    const handleExport = () => {
        console.log("Exporting data...");
        // Add your export logic here (e.g., downloading a file, calling an API, etc.)
    };

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Permohonan Krew" />
            <div className="flex flex-col md:flex-row min-h-screen bg-white">
                {/* Sidebar */}
                <div className="w-1/6 bg-white shadow-lg">
                    <SchoolAdminSideBar />
                </div>

                {/* Main Content */}
                <div className="w-full md:ml-[120px] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <nav className="mb-8">
                            <ol className="flex items-center space-x-2 text-gray-600">
                                <li>
                                    <a href="/studCrewList" className="text-[#4158A6] hover:text-blue-800 font-medium">
                                        Permohonan Krew
                                    </a>
                                </li>
                                <li className="text-gray-500">/</li>
                                <li className="text-gray-900 font-medium">
                                    Senarai Krew
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white border border-gray-200 shadow rounded-2xl">
                        {/* Search Bar */}
                        <div className="flex items-center mb-4 justify-between">
                            <div className="flex items-center w-full max-w-xs relative">
                                <FaSearch className="absolute right-3 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Cari Nama atau No. IC Pelajar..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)} // Trigger search on Enter
                                    className="w-full pl-4 pr-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#455185] focus:border-[#455185] transition-all placeholder-gray-400"
                                />
                            </div>

                            {/* Export and Bilangan Data Dropdown */}
                            <div className="flex items-center space-x-4">
                                <button
                                    style={{ marginTop: '1.45rem' }}
                                    onClick={handleExport} // Call handleExport on button click
                                    className="bg-[#455185] text-white rounded-2xl px-6 py-3 ml-4 hover:bg-[#3d4674] transition-all"
                                >
                                    Eksport
                                </button>

                                {/* Bilangan Data Dropdown */}
                                <div>
                                    <label
                                        htmlFor="rowsPerPage"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Bilangan Data
                                    </label>
                                    <select
                                        id="rowsPerPage"
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                        className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#455185] focus:border-[#455185] sm:text-sm rounded-md"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <table className="w-full text-left rounded-lg border-collapse">
                            <thead>
                                <tr className="bg-white">
                                    <th className="border-b px-4 py-6">Bil</th>
                                    <th className="border-b px-4 py-6">Nama Pelajar</th>
                                    <th className="border-b px-4 py-6">No Kad Pengenalan</th>
                                    <th className="border-b px-4 py-6">Jawatan</th>
                                    <th className="border-b px-4 py-6">Status</th>
                                    <th className="border-b px-4 py-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studcrews.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            Tiada Data Ditemui
                                        </td>
                                    </tr>
                                ) : (
                                    studcrews.data.map((crew, index) => (
                                        <tr key={crew.id} className="hover:bg-gray-50">
                                            <td className="border-b px-4 py-6">
                                                {(studcrews.current_page - 1) * studcrews.per_page + index + 1}
                                            </td>
                                            <td className="border-b px-4 py-6">{crew.student.name}</td>
                                            <td className="border-b px-4 py-6">{crew.student.ic_num}</td>
                                            <td className="border-b px-4 py-6">{crew.jawatan}</td>
                                            <td className="border-b px-4 py-6">
                                                <span
                                                    className={`px-2 py-1 rounded-full ${getStatusColor(crew.status)}`}
                                                >
                                                    {crew.status}
                                                </span>
                                            </td>
                                            <td className="border-b px-6 py-4 text-center">
                                                <div className="flex justify-center items-center space-x-4">
                                                    {/* Edit and Delete Icons */}
                                                    <button
                                                        onClick={() => Inertia.get(route('studcrew.edit', { id: crew.id }))}

                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this StudCrew?")) {
                                                                Inertia.delete(`/studcrew/${crew.id}`);
                                                            }
                                                        }}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <FaTrashAlt size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => Inertia.get(studcrews.prev_page_url)}
                                className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-600 font-medium disabled:opacity-50 ${!studcrews.prev_page_url && 'cursor-not-allowed'}`}
                                disabled={!studcrews.prev_page_url}
                            >
                                Sebelum
                            </button>
                            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-[#f1f5f9] text-[#455185] font-semibold shadow-sm text-sm">
                                Halaman {studcrews.current_page} daripada {studcrews.last_page}
                            </span>
                            <button
                                onClick={() => Inertia.get(studcrews.next_page_url)}
                                className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-600 font-medium disabled:opacity-50 ${!studcrews.next_page_url && 'cursor-not-allowed'}`}
                                disabled={!studcrews.next_page_url}
                            >
                                Seterusnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudCrewList;
