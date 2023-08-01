import React, { useState } from 'react';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage'; // Import the LandingPage component
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [showLandingPage, setShowLandingPage] = useState(true); // Initially show the Landing Page

  const handleLogin = (token) => {
    setAuthToken(token);
    setLoggedIn(true);
    setShowLandingPage(false); // Set showLandingPage to false on successful login
  };

  const handleLogout = () => {
    setAuthToken('');
    setLoggedIn(false);
    setShowLandingPage(true); // Show the Landing Page on logout
  };

  const handleGetStarted = () => {
    setShowLandingPage(false); // Set showLandingPage to false when "Get Started" is clicked
  };

  return (
    <div>
      <Navbar />
      {loggedIn ? (
        <div>
          <p>Logged In successfully as: {authToken}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : showLandingPage ? ( // Show the LandingPage component when showLandingPage is true
        <div>
          <LandingPage handleGetStarted={handleGetStarted} /> {/* Pass handleGetStarted as a prop */}
        </div>
      ) : (
        <div>
          <Authentication onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
