import React, { useState } from 'react';
import { 
  FaSearch, 
  FaChevronLeft, 
  FaChevronRight, 
  FaFileAlt, 
  FaTrophy, 
  FaUser 
} from 'react-icons/fa';
import StateAdminSideBar from '../StateAdminSideBar';

export default function ListSchool() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [certificateTitle, setCertificateTitle] = useState('');  // Added state for certificate title
  const [selectedFont, setSelectedFont] = useState('Arial');     // Added state for font
  const [file, setFile] = useState(null);                        // Added state for file upload
  const [achievementDetails, setAchievementDetails] = useState(null);

  // Example student data
  const studentData = [
    { id: '1', icNumber: '1234567890', fullName: 'Ali bin Ahmad', educationLevel: 'Form 4', achievementType: 'Cemerlang', achievementDetails: 'Achieved 5 A\'s in SPM' },
    { id: '2', icNumber: '9876543210', fullName: 'Siti Aisyah', educationLevel: 'Form 3', achievementType: 'Memuaskan', achievementDetails: 'Won first place in Science competition' },
    { id: '3', icNumber: '1122334455', fullName: 'Kamal bin Hassan', educationLevel: 'Form 5', achievementType: 'Baik', achievementDetails: 'Completed project on renewable energy' },
    { id: '4', icNumber: '6677889900', fullName: 'Maya binti Zain', educationLevel: 'Form 2', achievementType: 'Kurang Memuaskan', achievementDetails: 'Needs improvement in Mathematics' },
  ];

  const filteredStudents = studentData.filter(student => 
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

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

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);  // Handler for font selection
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Handler for file upload
  };

  const handleGenerateCertificate = () => {
    // Logic for generating certificate
    console.log('Generating Certificate with Title:', certificateTitle);
    console.log('Font:', selectedFont);
    console.log('File:', file);
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="w-64 bg-gradient-to-b from-[#2C3E50] to-[#34495E] text-white shadow-2xl">
        <StateAdminSideBar />
      </div>

      <div className="flex-1 p-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-blue-500">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center space-x-4">
            <FaUser className="text-3xl" />
            <h3 className="text-2xl font-bold tracking-wide">Maklumat Pelajar</h3>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center space-x-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Cari Nama Pelajar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 ease-in-out shadow-md"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>

              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="px-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 ease-in-out appearance-none"
              >
                <option value="5">5 Entri</option>
                <option value="10">10 Entri</option>
                <option value="25">25 Entri</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  {['Bil', 'IC Number', 'Nama Penuh', 'Tingkatan', 'Pencapaian', 'Maklumat'].map((header) => (
                    <th 
                      key={header} 
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center space-y-4">
                        <FaTrophy className="text-6xl text-gray-300" />
                        <p className="text-xl">Tiada Data Ditemui</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className="border-b hover:bg-blue-50 transition-colors duration-200 ease-in-out"
                    >
                      <td className="px-6 py-4 text-gray-600">{indexOfFirstStudent + index + 1}</td>
                      <td className="px-6 py-4 text-gray-700">{student.icNumber}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{student.fullName}</td>
                      <td className="px-6 py-4 text-gray-600">{student.educationLevel}</td>
                      <td className="px-6 py-4">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-semibold 
                            ${student.achievementType === 'Cemerlang' ? 'bg-green-100 text-green-800' : 
                              student.achievementType === 'Memuaskan' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}
                        >
                          {student.achievementType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setAchievementDetails(student.achievementDetails)}
                          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                        >
                          <FaFileAlt className="mr-2" /> Lihat Butiran
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-6 py-5 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-300"
              >
                <FaChevronLeft className="mr-2" /> Prev
              </button>
              <span className="text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:text-blue-600 disabled:opacity-50 flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-300"
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </div>
            <div className="text-gray-500 text-sm bg-gray-100 px-4 py-2 rounded-full">
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} entries
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaFileAlt className="mr-4 text-green-500" />
            Jana Sijil Pelajar
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tajuk Sijil</label>
              <input
                type="text"
                value={certificateTitle}
                onChange={(e) => setCertificateTitle(e.target.value)}
                placeholder="Masukkan tajuk sijil"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Font</label>
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300"
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300"
              />
            </div>

            <button 
              onClick={handleGenerateCertificate}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Jana Sijil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
