import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SchoolAdminSideBar from "../SchoolAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

const StudentList = () => {
    const { students } = usePage().props; 
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredStudents, setFilteredStudents] = useState(students.data || []);

    useEffect(() => {
        const results = (students.data || []).filter(
            (student) =>
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.ic_num.includes(searchQuery)
        );
        setFilteredStudents(results);
        setCurrentPage(1);
    }, [searchQuery, students]);

    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); 
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleExport = () => {
        console.log("Exporting data...");
    };

    const handleTambahPelajar = () => {
        router.visit("/students/create");
    };

    const paginatedData = filteredStudents.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Student Management" />
            <div className="flex">
                <div className="w-1/6 p-4 bg-gray-800 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-6 bg-white min-h-screen">
                    <h1 className="text-2xl font-semibold mb-6">Pengurusan Pelajar</h1>

                    {/* Search and Actions */}
                    <div className="flex justify-between items-center mb-4 space-x-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search by name or IC number"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="px-4 py-2 w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleTambahPelajar}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                            >
                                Tambah Pelajar
                            </button>
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-[#666969] text-white rounded-md shadow hover:bg-[#5c5f5f]"
                            >
                                Export
                            </button>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Show</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="px-4 py-2 border rounded-md shadow focus:outline-none"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm font-medium">Entries</span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4">Bil</th>
                                <th className="text-left p-4">Nama Pelajar</th>
                                <th className="text-left p-4">No Kad Pengenalan</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((student, index) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-4">
                                            {index + 1 + (currentPage - 1) * rowsPerPage}
                                        </td>
                                        <td className="p-4">{student.name}</td>
                                        <td className="p-4">{student.ic_num}</td>
                                        <td className="p-4">{student.email}</td>
                                        <td className="p-4 flex space-x-2">
                                            <button
                                                onClick={() => router.visit(`/students/${student.id}/edit`)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this student?")) {
                                                        router.delete(`/students/${student.id}`);
                                                    }
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No data found
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
};

export default StudentList;
