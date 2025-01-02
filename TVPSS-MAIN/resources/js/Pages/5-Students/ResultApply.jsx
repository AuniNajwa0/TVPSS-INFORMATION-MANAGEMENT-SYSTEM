import React, { useState } from 'react';
import StudentNavBar from './StudentNavBar';
import { Head } from "@inertiajs/react";
import { Search, Eye } from 'lucide-react';

function ResultApply({ applications }) { // Accept applications as a prop
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications = applications.filter((app) =>
    Object.values(app).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div style={pageStyle}>
      <Head title="TVPSS | Keputusan Permohonan" />
      <StudentNavBar />

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            Keputusan Permohonan
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
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Nombor ID</th>
                  <th style={thStyle}>Nama</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Jawatan</th>
                  <th style={thStyle}>Status</th>
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
                      <button style={buttonStyle}>
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
      </div>
    </div>
  );
}

export default ResultApply;