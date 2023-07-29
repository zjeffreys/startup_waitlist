import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/auth';

function App() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/token/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.auth_token); // Store the auth_token separately
        setLoggedIn(true);
        
        // Fetch user data using Djoser's /auth/me/ endpoint.
        const userResponse = await fetch(`${API_BASE_URL}/users/me/`, {
          headers: {
            'Authorization': `Token ${data.auth_token}`,
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("userData after /me/ => ", userData)
          setUserData(userData);
        } else {
          console.error('Error fetching user data');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  const handleLogout = async () => {
    try {
      // Check if the authToken is available before making the logout request
      if (!authToken) {
        console.error('No auth token available. Cannot log out.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/token/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
      });

      if (response.ok) {
        setLoggedIn(false);
        setAuthToken(''); // Clear the auth_token on logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Logged In successfully as: {userData ? userData.username : ''}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

          <h2>Register</h2>
          <input type="text" placeholder="Username" onChange={(e) => setRegisterUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
}

export default App;
