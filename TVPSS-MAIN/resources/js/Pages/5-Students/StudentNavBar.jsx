import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Import the dropdown icon from lucide-react
import { Link } from 'react-router-dom';

function StudentNavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Placeholder name for the profile
  const profileName = "John Doe";

  // Function to extract initials
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0].toUpperCase())
      .join("");
    return initials;
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#f8f9fa',
  };

  const logoStyle = {
    height: '60px',
    width: 'auto',
  };

  const navbarButtonsStyle = {
    display: 'flex',
    gap: '40px',
  };

  const navButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    border: 'none',
    borderRadius: '5px',
    color: '#4158A6',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const navButtonHoverStyle = {
    backgroundColor: '#e9e2e2',
  };

  const navbarProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  };

  const profileInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const profilePicStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    backgroundColor: '#4158A6',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '10px',
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    width: '150px',
    zIndex: '10',
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    maxHeight: isDropdownOpen ? '200px' : '0',
    transition: 'opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease',
    pointerEvents: isDropdownOpen ? 'auto' : 'none',
  };

  const dropdownItemStyle = {
    padding: '8px',
    backgroundColor: '#fff',
    border: 'none',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    color: '#333',
    fontWeight: 'bold',
  };

  return (
    <nav style={navbarStyle}>
      {/* Left side: Logo */}
      <div style={{ display: 'flex' }}>
        <img src="/assets/TVPSSLogo.jpg" alt="Logo" style={logoStyle} />
      </div>

      {/* Middle: Navigation buttons */}
      <div style={navbarButtonsStyle}>
        <button
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = navButtonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = navButtonStyle.backgroundColor)}
        >
          Utama
        </button>
        <button
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = navButtonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = navButtonStyle.backgroundColor)}
        >
          Permohonan Krew
        </button>
        <button
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = navButtonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = navButtonStyle.backgroundColor)}
        >
          Keputusan Permohonan
        </button>
      </div>

      {/* Right side: Profile with dropdown */}
      <div style={navbarProfileStyle}>
        <div style={profileInfoStyle} onClick={toggleDropdown}>
          <div style={profilePicStyle}>{getInitials(profileName)}</div>
          <span>{profileName}</span>
          <ChevronDown size={18} color="#333" /> {/* Dropdown icon */}
        </div>
        <div style={dropdownMenuStyle}>
          <button style={dropdownItemStyle}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default StudentNavBar;
