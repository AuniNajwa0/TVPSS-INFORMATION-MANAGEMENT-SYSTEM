import React, { useState } from 'react';
import StudentNavBar from './StudentNavBar';
import { Head } from "@inertiajs/react";
import { User, Mail, MapPin, School, Briefcase, Send, CheckCircle } from 'lucide-react';

function ToggleButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pageStyle = {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px',
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  };

  const formHeaderStyle = {
    textAlign: 'center',
    marginBottom: '35px',
  };

  const formTitleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px',
  };

  const formSubtitleStyle = {
    color: '#718096',
    fontSize: '16px',
    lineHeight: '1.5',
  };

  const formGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  };

  const iconContainerStyle = {
    position: 'absolute',
    left: '12px',
    color: '#4158A6',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 45px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    color: '#2d3748',
  };

  const inputHoverStyle = {
    ...inputStyle,
    ':hover': {
      borderColor: '#4158A6',
      backgroundColor: '#fff',
    },
    ':focus': {
      outline: 'none',
      borderColor: '#4158A6',
      backgroundColor: '#fff',
      boxShadow: '0 0 0 3px rgba(65, 88, 166, 0.1)',
    },
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginTop: '30px',
    marginBottom: '20px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e2e8f0',
  };

  const buttonStyle = {
    backgroundColor: '#4158A6',
    color: '#fff',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    marginTop: '30px',
    boxShadow: '0 4px 6px rgba(65, 88, 166, 0.1)',
    ':hover': {
      backgroundColor: '#344985',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 8px rgba(65, 88, 166, 0.2)',
    },
  };

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isModalVisible ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  };

  const checkIconStyle = {
    color: '#28a745', // Green color for success
    fontSize: '50px',
    marginBottom: '20px',
  };

  const okButtonStyle = {
    backgroundColor: '#4158A6',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // After submitting the form, show the modal
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalVisible(false);
  };

  return (
    <div style={pageStyle}>
      <Head title="TVPSS | Permohonan Krew TVPSS" />
      <StudentNavBar />

      <div style={formContainerStyle}>
        <div style={formHeaderStyle}>
          <h1 style={formTitleStyle}>Permohonan Krew TVPSS</h1>
          <p style={formSubtitleStyle}>Sila isi maklumat anda dengan lengkap dan tepat</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={sectionTitleStyle}>Maklumat Peribadi</div>
          
          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder="Nombor Kad Pengenalan"
              style={inputHoverStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder="Nama Pelajar"
              style={inputHoverStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Email Pelajar"
              style={inputHoverStyle}
            />
          </div>

          <div style={sectionTitleStyle}>Maklumat Sekolah</div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <MapPin size={18} />
            </div>
            <input
              type="text"
              placeholder="Negeri"
              style={inputHoverStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <MapPin size={18} />
            </div>
            <input
              type="text"
              placeholder="Daerah"
              style={inputHoverStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <School size={18} />
            </div>
            <input
              type="text"
              placeholder="Nama Sekolah"
              style={inputHoverStyle}
            />
          </div>

          <div style={sectionTitleStyle}>Maklumat Jawatan</div>

          <div style={formGroupStyle}>
            <div style={iconContainerStyle}>
              <Briefcase size={18} />
            </div>
            <select style={inputStyle}>
              <option value="">Pilih Jawatan Krew</option>
              <option value="Jurukamera">Jurukamera</option>
              <option value="Gaffer">Gaffer</option>
              <option value="Penemuduga">Penemuduga</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            <Send size={20} />
            Hantar Permohonan
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <CheckCircle size={50} style={checkIconStyle} />
          <h2>Permohonan Berjaya Dihantar</h2>
          <button onClick={handleCloseModal} style={okButtonStyle}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
