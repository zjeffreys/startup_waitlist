import React, { useState, useEffect } from 'react';
import './Waitlists.css';

const API_BASE_URL = 'http://localhost:8000/auth';

const Waitlists = () => {
  // State for current user data
  const [userData, setUserData] = useState(null);

  // Sample data for current waitlists (replace with your data)
  const [waitlists, setWaitlists] = useState([
    { id: 1, name: 'Waitlist A/B Test 1' },
    { id: 2, name: 'Waitlist A/B Test 2' },
    // Add more waitlist objects as needed
  ]);

  const [newWaitlistName, setNewWaitlistName] = useState('');

  const handleCreateWaitlist = () => {
    // Add logic to create a new waitlist (e.g., make API request)
    // and update the waitlists state with the new data
    const newWaitlist = { id: waitlists.length + 1, name: newWaitlistName };
    setWaitlists([...waitlists, newWaitlist]);
    setNewWaitlistName('');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
     
      // Clean Token TODO fix this so it's not needed
      const cleanedToken = token.replace(/^"(.*)"$/, '$1');
      console.log(`Token ${cleanedToken}`)

      const fetchUserData = async () => {
        try {
          const userResponse = await fetch(`${API_BASE_URL}/users/me/`, {
            headers: {
              'Authorization': `Token ${cleanedToken}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserData(userData);
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error during fetching data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <div className="waitlists-container">
      <h2>My Waitlists</h2>
      {userData && <p>Welcome, {userData.username}!</p>}

    </div>
  );
};

export default Waitlists;
