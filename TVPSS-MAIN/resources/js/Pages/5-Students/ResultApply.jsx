import React, { useState } from 'react';
import StudentNavBar from './StudentNavBar';
import { Head } from "@inertiajs/react";
import { Search, ChevronDown, ChevronUp, Eye, Filter } from 'lucide-react';

function ToggleButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      status: "Dalam Proses"
    },
    {
      id: 2,
      ic_num: "920202-02-2020",
      name: "Fatimah Binti Omar",
      email: "fatimah@gmail.com",
      negeri: "Selangor",
      daerah: "Petaling",
      jawatan: "Penemuduga",
      status: "Diluluskan"
    },
  ];

  const pageStyle = {
    backgroundColor: '#ebf8ff',
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

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#718096',
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
    backgroundColor: status === 'Diluluskan' ? '#dcfce7' : '#fee2e2',
    color: status === 'Diluluskan' ? '#166534' : '#991b1b',
    display: 'inline-block',
  });

  const sortIconStyle = (field) => ({
    display: 'inline-flex',
    marginLeft: '4px',
    color: sortField === field ? '#4158A6' : '#718096',
    transition: 'transform 0.2s ease',
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredApplications = applications
    .filter(app => 
      Object.values(app).some(value => 
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
            <Filter size={24} color="#4158A6" />
            Keputusan Permohonan
          </h1>
          <div style={searchContainerStyle}>
            <Search style={searchIconStyle} size={18} />
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
          {applications.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle} onClick={() => handleSort('id')}>
                    # {sortField === 'id' && (
                      <span style={sortIconStyle('id')}>
                        {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th style={thStyle} onClick={() => handleSort('ic_num')}>
                    No. Kad Pengenalan {sortField === 'ic_num' && (
                      <span style={sortIconStyle('ic_num')}>
                        {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th style={thStyle} onClick={() => handleSort('name')}>
                    Nama {sortField === 'name' && (
                      <span style={sortIconStyle('name')}>
                        {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </th>
                  <th style={thStyle} onClick={() => handleSort('email')}>Email</th>
                  <th style={thStyle} onClick={() => handleSort('negeri')}>Negeri</th>
                  <th style={thStyle} onClick={() => handleSort('daerah')}>Daerah</th>
                  <th style={thStyle} onClick={() => handleSort('jawatan')}>Jawatan</th>
                  <th style={thStyle} onClick={() => handleSort('status')}>Status</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application, index) => (
                  <tr 
                    key={application.id}
                    style={{ 
                      transition: 'all 0.2s ease',
                      ':hover': { backgroundColor: '#f1f5f9' }
                    }}
                  >
                    <td style={tdStyle(index)}>{index + 1}</td>
                    <td style={tdStyle(index)}>{application.ic_num}</td>
                    <td style={tdStyle(index)}>{application.name}</td>
                    <td style={tdStyle(index)}>{application.email}</td>
                    <td style={tdStyle(index)}>{application.negeri}</td>
                    <td style={tdStyle(index)}>{application.daerah}</td>
                    <td style={tdStyle(index)}>{application.jawatan}</td>
                    <td style={tdStyle(index)}>
                      <span style={statusBadgeStyle(application.status)}>
                        {application.status}
                      </span>
                    </td>
                    <td style={tdStyle(index)}>
                      <button 
                        style={buttonStyle}
                        onMouseOver={e => {
                          e.currentTarget.style.backgroundColor = '#344985';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.backgroundColor = '#4158A6';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Eye size={16} />
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#718096',
              fontSize: '16px',
              backgroundColor: '#f8fafc',
            }}>
              Tiada Sebarang Permohonan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
