import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaSearch, FaInfoCircle, FaFileAlt } from 'react-icons/fa';
import StateAdminSideBar from '../StateAdminSideBar';
import { Head, Link } from '@inertiajs/react'; // Import Link for routing

export default function ListSchool() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalData, setModalData] = useState(null);

  // Example data
  const schoolData = [
    { id: 1, fullName: 'Ali bin Ahmad', icNumber: '900101011234', educationLevel: 'Form 4', achievementType: 'Cemerlang', achievementDetails: '5A dalam peperiksaan' },
    { id: 2, fullName: 'Siti binti Ahmad', icNumber: '890202021234', educationLevel: 'Form 3', achievementType: 'Baik', achievementDetails: 'Memenangi pertandingan debat' },
    { id: 3, fullName: 'Kamal bin Hassan', icNumber: '880303031234', educationLevel: 'Form 5', achievementType: 'Memuaskan', achievementDetails: 'Projek kitar semula' },
    { id: 4, fullName: 'Maya binti Zain', icNumber: '870404041234', educationLevel: 'Form 2', achievementType: 'Kurang Memuaskan', achievementDetails: 'Perlu penambahbaikan dalam matematik' },
    { id: 5, fullName: 'Ahmad bin Sulaiman', icNumber: '860505051234', educationLevel: 'Form 4', achievementType: 'Cemerlang', achievementDetails: 'Projek sains terbaik' },
    // Add more sample data as needed
  ];

  // Filtering and pagination logic
  const filteredData = schoolData.filter((school) =>
    school.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleOpenModal = (achievementDetails) => {
    setModalData(achievementDetails);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <AuthenticatedLayout>
      <Head title="TVPSS | Jana Sijil" />
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <div className="w-1/6 bg-white shadow-lg">
          <StateAdminSideBar />
        </div>

        <div className="w-full md:ml-[120px] p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
          <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-gray-600">
                            <li>
                                <a href="/listSchoolCertificate" className="text-[#4158A6] hover:text-blue-800 font-medium">
                                    Jana Sijil Pelajar
                                </a>
                            </li>
                            <li className="text-gray-500">/</li>
                            <li className="text-gray-900 font-medium">
                                Semua Sijil
                            </li>
                        </ol>
                    </nav>

  {/* Jana Sijil Button */}
  <Link
    href="/certificate-Template-List " // Route to the certificate generation page
    className="inline-flex items-center px-6 py-3 text-white bg-[#4158A6] rounded-lg hover:bg-[#3C4565] font-semibold shadow-md"
  >
    <FaFileAlt className="mr-2" /> {/* Icon with some spacing */}
    Jana Sijil
  </Link>
</div>

          {/* Search and Table Section */}
          <div className="max-w-8xl mx-auto p-6 text-gray-900 bg-white border border-gray-200 shadow rounded-2xl">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center w-full max-w-xs relative">
                <FaSearch className="absolute right-3 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Cari Sekolah..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-4 pr-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#455185] focus:border-[#455185] transition-all placeholder-gray-400"
                />
              </div>
            </div>

            <table className="w-full text-left rounded-lg border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-6">Bil</th>
                  <th className="border-b px-4 py-6">Nama Penuh</th>
                  <th className="border-b px-4 py-6">Kad Pengenalan</th>
                  <th className="border-b px-4 py-6">Tingkatan Pendidikan</th>
                  <th className="border-b px-4 py-6 text-center">Jenis Pencapaian</th>
                  <th className="border-b px-4 py-6 text-center">Maklumat Pencapaian</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((school, index) => (
                  <tr key={school.id}>
                    <td className="border-b px-4 py-6">{indexOfFirstItem + index + 1}</td>
                    <td className="border-b px-4 py-6">{school.fullName}</td>
                    <td className="border-b px-4 py-6">{school.icNumber}</td>
                    <td className="border-b px-4 py-6">{school.educationLevel}</td>
                    <td className="border-b px-4 py-6 text-center">{school.achievementType}</td>
                    <td className="border-b px-4 py-6 items-center align-middle text-center">
                      <div className="flex justify-center items-center h-full">
                        <FaInfoCircle
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => handleOpenModal(school.achievementDetails)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      Tiada data dijumpai
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-600 font-medium disabled:opacity-50 ${currentPage === 1 && 'cursor-not-allowed'}`}
                disabled={currentPage === 1}
              >
                Sebelum
              </button>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-[#f1f5f9] text-[#455185] font-semibold shadow-sm text-sm">
                <span className="text-gray-600 mr-2">Halaman </span>
                <span className="bg-white px-3 py-1 rounded-lg text-[#455185] shadow-md border border-gray-200 mx-1">
                  {currentPage}
                </span>
                <span className="text-gray-600 ml-2">daripada</span>
                <span className="bg-white px-3 py-1 rounded-lg text-[#455185] shadow-md border border-gray-200 mx-1">
                  {totalPages}
                </span>
              </span>
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-600 font-medium disabled:opacity-50 ${currentPage === totalPages && 'cursor-not-allowed'}`}
                disabled={currentPage === totalPages}
              >
                Seterusnya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Maklumat Pencapaian</h3>
            <p className="mb-4">{modalData}</p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
