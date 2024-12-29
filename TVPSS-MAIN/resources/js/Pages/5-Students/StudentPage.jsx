import React from 'react';
import StudentNavBar from './StudentNavBar';
import { Head } from "@inertiajs/react";
import { Edit, Send, CheckCircle } from 'lucide-react'; // Importing icons

function ToggleButton() {
  const pageStyle = {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px',
  };

  const contentContainerStyle = {
    maxWidth: '1000px',
    margin: '60px auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const textContainerStyle = {
    textAlign: 'left', // Align text to the left
    flex: 1,
  };

  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '60px',
    color: '#333',
    marginBottom: '20px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#4158A6',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#334A7E', // Darken the color on hover
  };

  const imageContainerStyle = {
    flex: 1,
    textAlign: 'right',
  };

  // Styles for Steps Section
  const stepsContainerStyle = {
    backgroundColor: '#f0f0f0', // Background color to separate from the top content
    padding: '80px 60px',
    textAlign: 'center', // Center the heading text
    marginTop: '40px', // Add space between this section and the content above
    borderRadius: '10px',
  };

  const stepBoxStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '20px',
    textAlign: 'center', // Center text in each box
    display: 'flex',
    flexDirection: 'column', // Stack the icon, label, and description vertically
    alignItems: 'center', // Center content horizontally
  };

  const iconStyle = {
    marginBottom: '20px', // Add space between icon and text
    fontSize: '60px', // Make the icons bigger
  };

  return (
    <div style={pageStyle}>
      <Head title="TVPSS | Pelajar" />
      <StudentNavBar />

      {/* Content Section */}
      <div style={contentContainerStyle}>
        {/* Text Section */}
        <div style={textContainerStyle}>
          <div style={headerStyle}>TV PUSAT SUMBER SEKOLAH</div>
          <div style={descriptionStyle}>
            Sertai kami dalam menghasilkan kandungan berita yang menarik dan kreatif. 
            Peluang untuk belajar, berkarya, dan berkongsi cerita di platform sekolah. 
            Mohon sekarang dan jadilah sebahagian daripada pasukan!
          </div>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => Inertia.visit(route('student.applyCrew'))}
          >
            Mohon Sekarang
          </button>

        </div>

        {/* Placeholder Image Section */}
        <div style={imageContainerStyle}>
          <img
            src="/assets/login1.jpg" // Replace with your image URL
            alt="TV Pusat Sumber Sekolah"
            style={{ maxWidth: '100%', borderRadius: '20px' }}
          />
        </div>
      </div>

      {/* Steps Section */}
      <div style={stepsContainerStyle}>
        <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
          Cara Memohon Krew
        </h2>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Permohonan boleh dilakukan di mana-mana sahaja melalui peranti mudah alih dan hanya mengambil masa 5 minit.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%' }}>
          {/* Step 1 */}
          <div style={stepBoxStyle}>
            <Edit color="#FF6347" size={60} style={iconStyle} />
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Langkah : 1</div>
            <p>Masukkan nama pengguna dan kata laluan anda untuk mengakses sistem.</p>
          </div>
          {/* Step 2 */}
          <div style={stepBoxStyle}>
            <Send color="#4CAF50" size={60} style={iconStyle} />
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Langkah : 2</div>
            <p>Lengkapkan borang permohonan dengan maklumat yang diperlukan. Pastikan semua butiran adalah tepat sebelum menghantar.</p>
          </div>
          {/* Step 3 */}
          <div style={stepBoxStyle}>
            <CheckCircle color="#FF9800" size={60} style={iconStyle} />
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Langkah : 3</div>
            <p>Setelah menghantar permohonan, tunggu keputusan yang akan dimaklumkan melalui e-mel atau sistem notifikasi.</p>
          </div>
        </div>

        {/* "Mohon Sekarang" Button below Steps */}
        <div style={{ marginTop: '40px' }}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => Inertia.visit(route('student.applyCrew'))}
        >
          Mohon Sekarang
        </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
