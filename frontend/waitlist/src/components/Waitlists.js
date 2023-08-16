import React, { useState, useEffect } from 'react';
import './Waitlists.css';

const API_BASE_URL = 'http://localhost:8000/auth';

const Waitlists = () => {
  const [userData, setUserData] = useState(null);
  const [newWaitlistName, setNewWaitlistName] = useState('');
  const [waitlists, setWaitlists] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');


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
            const errorData = await waitlistResponse.json();
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
        setWaitlistError('Waitlist created successfully'); // Assuming the error message is in the "detail" field
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
          setWaitlistError('Error fetching updated waitlists'); // Assuming the error message is in the "detail" field
        }

        setNewWaitlistName('');
        setShowForm(false);
      } else {
        console.error('Error creating waitlist');
        setWaitlistError('Name is already taken.'); // Assuming the error message is in the "detail" field
      }
    } catch (error) {
      console.error('Error during waitlist creation:', error);
      setWaitlistError('Error during waitlist creation:', error); // Assuming the error message is in the "detail" field

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
                <button className="copy-url-button" onClick={() => handleCopyURL('http://localhost:3000/page?name=' + waitlist.name)}>Copy Link</button>
              </td>
              <td>
                <a href={`/my-waitlists/edit?waitlistId=${waitlist.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='create-new-waitlist'>
        {showForm ? (
          <form onSubmit={handleCreateWaitlist}>
            {waitlistError && <p className="error-message">{waitlistError}</p>}
              <input
                type="text"
                value={newWaitlistName}
                onChange={(e) => setNewWaitlistName(e.target.value)}
                placeholder='Waitlist Name:'
                pattern="^\S+$"  // Regular expression to disallow spaces
                title="No spaces are allowed"
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
