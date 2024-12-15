import React, { useState } from 'react';
import { FaSearch, FaEye, FaChevronLeft, FaChevronRight, FaFilter, FaCaretDown, FaSortNumericUpAlt, FaStar, FaSchool } from 'react-icons/fa';
import StateAdminSideBar from '../StateAdminSideBar'; // Ensure this is correctly imported
import { Bar, Doughnut } from 'react-chartjs-2'; // Make sure the charts library is installed

export default function ListSchool() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Harian');
  const [date, setDate] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const schoolData = [
    { id: '1', name: 'SJK (C) Kuo Kuang 2', code: 'JEA9012', principal: 'Mr. Tan Ah Kow', achievement: 'Cemerlang', applicationType: 'Naik Taraf', status: 'Dijana' },
    { id: '2', name: 'SJK (C) Pu Sze', code: 'JEA7890', principal: 'Mdm. Lee Mei Ling', achievement: 'Memuaskan', applicationType: 'Naik Taraf', status: 'Dijana' },
    { id: '3', name: 'SK Air Tawar', code: 'JEA3042', principal: 'Cik Zurina binti Hanapi', achievement: 'Cemerlang', applicationType: 'Pembinaan Baharu', status: 'Dijana' },
    { id: '4', name: 'SK Skudai', code: 'JEA3456', principal: 'Cik Noraini binti Mohd Nor', achievement: 'Baik', applicationType: 'Naik Taraf', status: 'Dijana' },
    { id: '5', name: 'SK Skudai Baru', code: 'JEA1234', principal: 'Encik Ahmad bin Hassan', achievement: 'Baik', applicationType: 'Naik Taraf', status: 'Dijana' },
    { id: '6', name: 'SK Taman Sri Pulai', code: 'JEA6789', principal: 'Puan Jamaliah binti Ahmad', achievement: 'Memuaskan', applicationType: 'Pembinaan Baharu', status: 'Dijana' },
    { id: '7', name: 'SK Taman Universiti', code: 'JEA5678', principal: 'Puan Siti Aminah binti Abdullah', achievement: 'Kurang Memuaskan', applicationType: 'Naik Taraf', status: 'Menunggu Kelulusan' },
    { id: '8', name: 'SK Taman Universiti', code: 'JEA3210', principal: 'Encik Abdullah bin Osman', achievement: 'Memuaskan', applicationType: 'Naik Taraf', status: 'Menunggu Kelulusan' },
  ];

  const filteredSchools = schoolData.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? school.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastSchool = currentPage * rowsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - rowsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirstSchool, indexOfLastSchool);

  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

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

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Dijana': return 'bg-emerald-500';
      case 'Menunggu Kelulusan': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getAchievementColor = (achievement) => {
    switch(achievement) {
      case 'Cemerlang': return 'text-blue-600 font-bold';
      case 'Memuaskan': return 'text-green-600';
      case 'Baik': return 'text-teal-600';
      case 'Kurang Memuaskan': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const statusOptions = [
    { label: 'Semua Status', value: '' },
    { label: 'Dijana', value: 'Dijana' },
    { label: 'Menunggu Kelulusan', value: 'Menunggu Kelulusan' }
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="w-1/6 bg-[#2C3E50] text-white">
        <StateAdminSideBar />
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-[#3498DB] text-white p-6 flex justify-between items-center">
            <h3 className="text-2xl font-bold">Maklumat Sekolah</h3>
          </div>

          <div className="p-6 bg-gray-100 border-b">
            <div className="flex justify-between items-center space-x-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Cari Nama Sekolah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FaFilter className="mr-2" />
                  {statusOptions.find(option => option.value === statusFilter)?.label || 'Filter Status'}
                  <FaCaretDown className="ml-2" />
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${statusFilter === option.value ? 'bg-blue-50 text-blue-600' : ''}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  {['Bil', 'Nama Sekolah', 'Kod Sekolah', 'Nama Pengetua', 'Pencapaian', 'Jenis Permohonan', 'Status', 'Aksi'].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentSchools.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      Tiada Data Ditemui
                    </td>
                  </tr>
                ) : (
                  currentSchools.map((school, index) => (
                    <tr key={school.id} className="border-b hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4">{indexOfFirstSchool + index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{school.name}</td>
                      <td className="px-6 py-4 text-gray-600">{school.code}</td>
                      <td className="px-6 py-4">{school.principal}</td>
                      <td className={`px-6 py-4 ${getAchievementColor(school.achievement)}`}>
                        {school.achievement}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{school.applicationType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(school.status)}`}>
                          {school.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                          <FaEye className="mr-2" /> Lihat
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-6 py-4 flex justify-between items-center border-t">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center"
              >
                <FaChevronLeft className="mr-2" /> Prev
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center"
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </div>
            <div className="text-gray-500 text-sm">
              Showing {indexOfFirstSchool + 1} to {Math.min(indexOfLastSchool, filteredSchools.length)} of {filteredSchools.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
