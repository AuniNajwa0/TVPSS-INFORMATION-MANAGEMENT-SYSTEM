import React, { useState } from 'react';
import { FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import StateAdminSideBar from '../PPDAdminSideBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the Authenticated Layout
import { Head } from '@inertiajs/react';

export default function TVPSSInfoSchoolPPD() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchools, setSelectedSchools] = useState([]);

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

  const handleCheckboxChange = (id) => {
    setSelectedSchools((prev) =>
      prev.includes(id) ? prev.filter((schoolId) => schoolId !== id) : [...prev, id]
    );
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Info Status TVPSS</h2>}>
      <Head title="TVPSS | Info Status TVPSS" />
      <div className="flex">
        <div className="w-1/6 p-4 bg-gray-800 text-white min-h-screen">
          <StateAdminSideBar />
        </div>

        <div className="flex-1 p-6 bg-white min-h-screen">
          <h1 className="text-2xl font-semibold mb-6">Maklumat Sekolah</h1>

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

              {/* Bilangan Dropdown Section */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Tunjuk</span>
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
                <span className="text-sm font-medium">Entri</span>
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
                        setSelectedSchools(filteredData.map((school) => school.id));
                      } else {
                        setSelectedSchools([]);
                      }
                    }}
                    checked={
                      selectedSchools.length === filteredData.length && filteredData.length > 0
                    }
                  />
                </th>
                <th className="text-left p-4">Kod Sekolah</th>
                <th className="text-left p-4">Nama Sekolah</th>
                <th className="text-left p-4">Nama Pengawai Sekolah</th>
                <th className="text-left p-4">Versi</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedSchools.includes(school.id)}
                      onChange={() => handleCheckboxChange(school.id)}
                    />
                  </td>
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
                  <td className="p-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
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
