import { Head } from "@inertiajs/react";
import { Eye, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import StudentNavBar from './StudentNavBar';

function ResultApply({ applications = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplications, setFilteredApplications] = useState(applications);

    // useEffect to filter applications based on searchTerm
    useEffect(() => {
        const results = applications.filter(app =>
            Object.values(app).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        // Only update state if results have changed
        if (JSON.stringify(results) !== JSON.stringify(filteredApplications)) {
            setFilteredApplications(results);
        }
    }, [searchTerm, applications]); // Only re-run when searchTerm or applications change
    console.log('Applications received:', applications);

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
        color: '# 4a5568',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
    });

    return (
        <div style={pageStyle}>
          <StudentNavBar />
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Application Results</h1>
                    <div style={searchContainerStyle}>
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={searchInputStyle}
                        />
                        <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Application ID</th>
                                <th style={thStyle}>Student Name</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Date Submitted</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((app, index) => (
                                <tr key={app.id}>
                                    <td style={tdStyle(index)}>{app.id}</td>
                                    <td style={tdStyle(index)}>{app.studentName}</td>
                                    <td style={tdStyle(index)}>{app.status}</td>
                                    <td style={tdStyle(index)}>{new Date(app.dateSubmitted).toLocaleDateString()}</td>
                                    <td style={tdStyle(index)}>
                                        <button>
                                            <Eye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ResultApply;