import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import StateAdminSideBar from '../StateAdminSideBar';

export default function ListSchool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const schoolData = [
    { id: 'JEA9012', name: 'SJK (C) Kuo Kuang 2', officer: 'Mr. Tan Ah Kow', version: 3, status: 'Aktif' },
    { id: 'JEA7890', name: 'SJK (C) Pu Sze', officer: 'Mdm. Lee Mei Ling', version: 1, status: 'Aktif' },
    { id: 'JEA3042', name: 'SK Air Tawar', officer: 'Cik Zurina binti Hanapi', version: 1, status: 'Aktif' },
    { id: 'JEA3456', name: 'SK Skudai', officer: 'Cik Noraini binti Mohd Nor', version: 2, status: 'Aktif' },
    { id: 'JEA1234', name: 'SK Skudai Baru', officer: 'Encik Ahmad bin Hassan', version: 2, status: 'Aktif' },
    { id: 'JEA6789', name: 'SK Taman Sri Pulai', officer: 'Puan Jamaliah binti Ahmad', version: 1, status: 'Aktif' },
    { id: 'JEA5678', name: 'SK Taman Universiti', officer: 'Puan Siti Aminah binti Abdullah', version: 1, status: 'Tidak Aktif' },
    { id: 'JEA3210', name: 'SK Taman Universiti', officer: 'Encik Abdullah bin Osman', version: 1, status: 'Tidak Aktif' },
  ];

  const filteredData = schoolData.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex">
      <div className="w-1/6 p-4 bg-gray-800 text-white min-h-screen">
        <StateAdminSideBar />
      </div>

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Maklumat Sekolah</h1>

        {/* Search Bar and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Cari Nama Sekolah..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
              <FaFilter className="mr-2" /> Filter
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="rowsPerPage" className="text-sm font-medium">Bilangan Data:</label>
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
          </div>
        </div>

        {/* Table */}
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-4">Kod Sekolah</th>
              <th className="text-left p-4">Nama Sekolah</th>
              <th className="text-left p-4">Nama Pengawai Sekolah</th>
              <th className="text-left p-4">Versi</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((school, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b">
                <td className="p-4">{school.id}</td>
                <td className="p-4">{school.name}</td>
                <td className="p-4">{school.officer}</td>
                <td className="p-4">{school.version}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      school.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {school.status}
                  </span>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Tiada Data Ditemui
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
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
  );
}
