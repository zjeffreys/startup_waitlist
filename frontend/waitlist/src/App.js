import React from 'react';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage'; // Import the LandingPage component
import Navbar from './components/Navbar';
import Waitlists from './components/Waitlists';
import EditWaitlist from './components/EditWaitlist'
import UserLandingPage from './components/UserLandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const isSessionTokenSet = () => {
    const sessionToken = sessionStorage.getItem('token');
    return !!sessionToken; // Return true if the session token is set, otherwise false
  };

  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/authentication" element={<Authentication />}/>
          <Route path="/my-waitlists" element={isSessionTokenSet() ? <Waitlists />: <Authentication/>}/>
          <Route path="/my-waitlists/edit" element={isSessionTokenSet() ? <EditWaitlist />: <Authentication/>}/>
          <Route path="/page" element={<UserLandingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
