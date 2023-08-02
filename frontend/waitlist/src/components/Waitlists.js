// Waitlists.js
import React, { useState } from 'react';
import './Waitlists.css';

const Waitlists = () => {
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

  return (
    <div className="waitlists-container">
      <h2>My Waitlists</h2>
      <div className="waitlists-list">
        {waitlists.map((waitlist) => (
          <div key={waitlist.id} className="waitlist-item">
            {waitlist.name}
          </div>
        ))}
      </div>
      <div className="create-waitlist">
        <input
          type="text"
          placeholder="Enter waitlist name"
          value={newWaitlistName}
          onChange={(e) => setNewWaitlistName(e.target.value)}
        />
        <button onClick={handleCreateWaitlist}>Create Waitlist</button>
      </div>
    </div>
  );
};

export default Waitlists;
