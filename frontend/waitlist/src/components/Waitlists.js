import React, { useState, useEffect } from 'react';
import './Waitlists.css';

const API_BASE_URL = 'http://localhost:8000/auth';

const Waitlists = () => {
  const [userData, setUserData] = useState(null);
  const [newWaitlistName, setNewWaitlistName] = useState('');
  const [waitlists, setWaitlists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const cleanedToken = token.replace(/^"(.*)"$/, '$1');
      console.log(`Token ${cleanedToken}`);

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

      const fetchWaitlists = async () => {
        try {
          const waitlistResponse = await fetch('http://localhost:8000/waitlists/', {
            headers: {
              'Authorization': `Token ${cleanedToken}`,
            },
          });

          if (waitlistResponse.ok) {
            const waitlistData = await waitlistResponse.json();
            setWaitlists(waitlistData);
          } else {
            console.error('Error fetching waitlists');
          }
        } catch (error) {
          console.error('Error during fetching waitlists:', error);
        }
      };

      fetchUserData();
      fetchWaitlists();
    }
  }, []);

  const handleCreateWaitlist = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
      const cleanedToken = token.replace(/^"(.*)"$/, '$1');

      const response = await fetch('http://localhost:8000/waitlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${cleanedToken}`,
        },
        body: JSON.stringify({
          name: newWaitlistName,
        }),
      });

      if (response.ok) {
        console.log('Waitlist created successfully');
        const updatedWaitlistResponse = await fetch('http://localhost:8000/waitlists/', {
          headers: {
            'Authorization': `Token ${cleanedToken}`,
          },
        });

        if (updatedWaitlistResponse.ok) {
          const updatedWaitlistData = await updatedWaitlistResponse.json();
          setWaitlists(updatedWaitlistData);
        } else {
          console.error('Error fetching updated waitlists');
        }

        setNewWaitlistName('');
        setShowForm(false);
      } else {
        console.error('Error creating waitlist');
      }
    } catch (error) {
      console.error('Error during waitlist creation:', error);
    }
  };

  const handleCopyURL = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('copied link to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying URL:', error);
      });
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className="waitlists-container">
      <h2>My Waitlists</h2>
      {/* {userData && <p>Welcome, {userData.username}!</p>} */}

      <table className="waitlists-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {waitlists.map((waitlist) => (
            <tr key={waitlist.id}>
              <td>{waitlist.name}</td>
              <td>
                <button className="copy-url-button" onClick={() => handleCopyURL(API_BASE_URL + waitlist.name)}>Copy Link</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='create-new-waitlist'>
        {showForm ? (
          <form onSubmit={handleCreateWaitlist}>
              <input
                type="text"
                value={newWaitlistName}
                onChange={(e) => setNewWaitlistName(e.target.value)}
                placeholder='Waitlist Name:'
                required
              />
            <button type="submit">Create Waitlist</button>
          </form>
        ) : (
          <button className='toggle-form' onClick={toggleForm}>Create New Waitlist</button>
        )}
      </div>
    </div>
  );
};

export default Waitlists;
