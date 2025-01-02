import React, { useState } from 'react';
import StudentNavBar from './StudentNavBar';
import { Head } from "@inertiajs/react";
import { Search, ChevronDown, ChevronUp, Eye, Filter } from 'lucide-react';

function ToggleButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const applications = [
    {
      id: 1,
      ic_num: "901010-10-1010",
      name: "Ali Ahmad",
      email: "ali@gmail.com",
      negeri: "Johor",
      daerah: "Muar",
      jawatan: "Jurukamera",
      status: "Dalam Proses",
    },
    {
      id: 2,
      ic_num: "920202-02-2020",
      name: "Fatimah Binti Omar",
      email: "fatimah@gmail.com",
      negeri: "Selangor",
      daerah: "Petaling",
      jawatan: "Penemuduga",
      status: "Diluluskan",
    },
    {
      id: 3,
      ic_num: "930303-03-3030",
      name: "Ahmad Badrul",
      email: "ahmad@gmail.com",
      negeri: "Perak",
      daerah: "Ipoh",
      jawatan: "Jurufoto",
      status: "Gagal",
    },
  ];

  const pageStyle = {
    backgroundColor: '#f0f7ff',
    minHeight: '100vh',
    padding: '20px',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const searchContainerStyle = {
    position: 'relative',
    width: '300px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
  };

  const tableContainerStyle = {
    overflow: 'auto',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    minWidth: '800px',
  };

  const thStyle = {
    backgroundColor: '#f8fafc',
    color: '#4a5568',
    padding: '16px',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  const tdStyle = (index) => ({
    padding: '16px',
    fontSize: '14px',
    color: '#2d3748',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: index % 2 === 0 ? '#fff' : '#f8fafc',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap',
  });

  const buttonStyle = {
    backgroundColor: '#4158A6',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const statusBadgeStyle = (status) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: status === 'Diluluskan' ? '#dcfce7' : status === 'Dalam Proses' ? '#fef08a' : '#fee2e2',
    color: status === 'Diluluskan' ? '#166534' : status === 'Dalam Proses' ? '#92400e' : '#991b1b',
    display: 'inline-block',
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewClick = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  const filteredApplications = applications
    .filter((app) =>
      Object.values(app).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div style={pageStyle}>
      <Head title="TVPSS | Keputusan Permohonan" />
      <StudentNavBar />

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            <Filter size={24} color="#4158A6" /> Keputusan Permohonan
          </h1>
          <div style={searchContainerStyle}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
            <input
              type="text"
              placeholder="Cari permohonan..."
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={tableContainerStyle}>
          {filteredApplications.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle} onClick={() => handleSort('id')}>
                    #
                  </th>
                  <th style={thStyle} onClick={() => handleSort('ic_num')}>
                    Nombor ID
                  </th>
                  <th style={thStyle} onClick={() => handleSort('name')}>
                    Nama
                  </th>
                  <th style={thStyle} onClick={() => handleSort('email')}>
                    Email
                  </th>
                  <th style={thStyle} onClick={() => handleSort('jawatan')}>
                    Jawatan
                  </th>
                  <th style={thStyle} onClick={() => handleSort('status')}>
                    Status
                  </th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application, index) => (
                  <tr key={application.id}>
                    <td style={tdStyle(index)}>{index + 1}</td>
                    <td style={tdStyle(index)}>{application.ic_num}</td>
                    <td style={tdStyle(index)}>{application.name}</td>
                    <td style={tdStyle(index)}>{application.email}</td>
                    <td style={tdStyle(index)}>{application.jawatan}</td>
                    <td style={tdStyle(index)}>
                      <span style={statusBadgeStyle(application.status)}>
                        {application.status}
                      </span>
                    </td>
                    <td style={tdStyle(index)}>
                      <button style={buttonStyle} onClick={() => handleViewClick(application)}>
                        <Eye size={16} /> Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                color: '#718096',
                fontSize: '16px',
                backgroundColor: '#f8fafc',
              }}
            >
              Tiada Sebarang Permohonan
            </div>
          )}
        </div>

        {isModalVisible && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={() => setIsModalVisible(false)}
          >
            <div
              style={{
                width: '400px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ color: '#1a202c', marginBottom: '20px' }}>
                {selectedApplication.status === 'Diluluskan'
                  ? 'Tahniah!'
                  : selectedApplication.status === 'Dalam Proses'
                  ? 'Masih Dalam Proses'
                  : 'Gagal'}
              </h2>
              <div
                style={{
                  marginBottom: '20px',
                  color: '#1a202c',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                {selectedApplication.status === 'Diluluskan' &&
                  'Permohonan anda sebagai krew telah diluluskan, sila cetak slip ini.'}
                {selectedApplication.status === 'Dalam Proses' &&
                  'Permohonan anda sebagai krew masih dalam proses.'}
                {selectedApplication.status === 'Gagal' &&
                  'Permohonan anda sebagai krew telah ditolak, sila mohon sekali lagi.'}
              </div>
              {selectedApplication.status === 'Diluluskan' && (
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#38a169',
                    marginRight: '10px',
                  }}
                >
                  Cetak Slip
                </button>
              )}
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: '#718096',
                }}
                onClick={() => setIsModalVisible(false)}
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleButton;
