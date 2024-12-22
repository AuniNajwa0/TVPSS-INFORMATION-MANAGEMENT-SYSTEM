import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { router } from "@inertiajs/react";
import StateAdminSideBar from "../PPDAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function TVPSSInfoSchoolPPD({ schools }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [filteredData, setFilteredData] = useState(schools);

    useEffect(() => {
        const searchResults = schools.filter((school) =>
            school.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(searchResults);
        setCurrentPage(1);
    }, [searchQuery, schools]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedSchools((prev) =>
            prev.includes(id)
                ? prev.filter((schoolId) => schoolId !== id)
                : [...prev, id]
        );
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-200 text-yellow-700";
            case "Approved":
                return "bg-green-200 text-green-700";
            case "Rejected":
                return "bg-red-200 text-red-700";
            default:
                return "bg-gray-200 text-gray-700";
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Info Status TVPSS
                </h2>
            }
        >
            <Head title="TVPSS | Info Status TVPSS" />
            <div className="flex">
                <div className="w-1/6 p-4 bg-gray-800 text-white min-h-screen">
                    <StateAdminSideBar />
                </div>

                <div className="flex-1 p-6 bg-white min-h-screen">
                    <h1 className="text-2xl font-semibold mb-6">
                        Maklumat Sekolah
                    </h1>

                    {/* Search Bar and Actions */}
                    <div className="flex justify-between items-center mb-4 space-x-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Cari Nama Sekolah..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="px-4 py-2 w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                                <FaFilter className="mr-2" /> Filter
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-[#666969] text-white rounded-md shadow hover:bg-[#5c5f5f]">
                                Eksport
                            </button>
                            <button className="px-4 py-2 bg-[#F44336] text-white rounded-md shadow hover:bg-[#e32e2e]">
                                Hapus
                            </button>

                            {/* Rows per Page Dropdown */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                    Tunjuk
                                </span>
                                <select
                                    id="rowsPerPage"
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="px-4 py-2 border rounded-md shadow focus:outline-none"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                </select>
                                <span className="text-sm font-medium">
                                    Entri
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedSchools(
                                                    filteredData.map(
                                                        (school) =>
                                                            school.schoolCode
                                                    )
                                                );
                                            } else {
                                                setSelectedSchools([]);
                                            }
                                        }}
                                        checked={
                                            selectedSchools.length ===
                                                filteredData.length &&
                                            filteredData.length > 0
                                        }
                                    />
                                </th>
                                <th className="text-left p-4">Kod Sekolah</th>
                                <th className="text-left p-4">Nama Sekolah</th>
                                <th className="text-left p-4">
                                    Nama Pegawai Sekolah
                                </th>
                                <th className="text-left p-4">Versi</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((school) => (
                                    <tr
                                        key={school.schoolCode}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedSchools.includes(
                                                    school.schoolCode
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        school.schoolCode
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-4">
                                            {school.schoolCode}
                                        </td>
                                        <td className="p-4">
                                            {school.schoolName}
                                        </td>
                                        <td className="p-4">
                                            {school.schoolOfficer || "N/A"}
                                        </td>
                                        <td className="p-4">
                                            {school.schoolVersion}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded-full ${getStatusStyle(
                                                    school.status
                                                )}`}
                                            >
                                                {school.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                onClick={() => router.visit(`/tvpssInfoPPD/${school.schoolCode}/edit`)}
                                            >
                                                Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-4"
                                    >
                                        Tiada Data Ditemui
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={handlePrevPage}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <span className="text-sm text-gray-600 font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
