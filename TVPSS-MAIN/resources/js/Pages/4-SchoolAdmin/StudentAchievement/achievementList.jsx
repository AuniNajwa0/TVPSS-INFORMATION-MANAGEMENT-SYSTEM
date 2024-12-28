import React, { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import SchoolAdminSideBar from "../SchoolAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

const StudentAchievements = () => {
    const { achievements } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAchievements, setFilteredAchievements] = useState(achievements || []);

    useEffect(() => {
        const results = (achievements || []).filter((achievement) => {
            if (!achievement || !achievement.type_of_achievement || !achievement.id) return false;

            return (
                achievement.type_of_achievement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                achievement.id.includes(searchQuery)
            );
        });
        setFilteredAchievements(results);
        setCurrentPage(1);
    }, [searchQuery, achievements]);

    const totalPages = Math.ceil(filteredAchievements.length / rowsPerPage);

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleHantarBorang = () => {
        router.visit("/achievements/create");
    };

    const paginatedData = filteredAchievements.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <AuthenticatedLayout>
            <Head title="TVPSS | Pencapaian Pelajar" />
            <div className="flex">
                <div className="w-1/6 p-4 bg-gray-800 text-white min-h-screen">
                    <SchoolAdminSideBar />
                </div>

                <div className="flex-1 p-6 bg-white min-h-screen">
                    <h1 className="text-2xl font-semibold mb-2">Pencapaian Pelajar</h1>
                    <div className="text-sm text-gray-600 mb-6">
                        <span>Pencapaian Pelajar</span>
                        <span className="mx-2">›</span>
                        <span>Semua Pencapaian</span>
                    </div>

                    {/* Search and Actions */}
                    <div className="flex justify-between items-center mb-4 space-x-4">
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Cari Pencapaian..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="px-4 py-2 w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-4 py-2 border rounded-md shadow-sm">
                                Filter
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Tunjuk</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="px-4 py-2 border rounded-md shadow-sm focus:outline-none"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <button
                                onClick={handleHantarBorang}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
                            >
                                Hantar Borang Pencapaian Pelajar
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-4 w-8">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    <th className="text-left p-4">Bil</th>
                                    <th className="text-left p-4">Jenis Pencapaian</th>
                                    <th className="text-left p-4">Kod</th>
                                    <th className="text-left p-4">Jenis Permohonan</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-right p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((achievement, index) => (
                                        <tr key={achievement.id} className="hover:bg-gray-50 border-b">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                {index + 1 + (currentPage - 1) * rowsPerPage}
                                            </td>
                                            <td className="p-4">{achievement.type_of_achievement}</td>
                                            <td className="p-4">{achievement.id}</td>
                                            <td className="p-4">{achievement.type_of_application}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${
                                                        achievement.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : achievement.status === "Approved"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {achievement.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => router.visit(`/achievements/${achievement.id}`)}
                                                        className="p-1 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    "Are you sure you want to delete this achievement?"
                                                                )
                                                            ) {
                                                                router.delete(`/achievements/${achievement.id}`);
                                                            }
                                                        }}
                                                        className="p-1 text-gray-500 hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Info */}
                    <div className="mt-4 text-sm text-gray-600">
                        Menunjukkan {paginatedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} hingga{" "}
                        {Math.min(currentPage * rowsPerPage, filteredAchievements.length)} daripada{" "}
                        {filteredAchievements.length} entri
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentAchievements;
