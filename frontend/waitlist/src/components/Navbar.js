// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isSessionTokenSet = () => {
    const sessionToken = sessionStorage.getItem('token');
    return !!sessionToken; // Return true if the session token is set, otherwise false
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/authentication', { replace: true });
    };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href='/' className="logo">Waitlist AI</a>
        
        {isSessionTokenSet() && ( // Conditionally render the Logout button
          <button className="logout" onClick={handleLogout}>Logout</button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
