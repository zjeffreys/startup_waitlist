import React, { useState } from 'react';
import './Authentication.css';

const API_BASE_URL = 'http://localhost:8000/auth';

const Authentication = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);
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
        setAuthToken(data.auth_token);
        setLoggedIn(true);

        onLogin(data.auth_token);

        const userResponse = await fetch(`${API_BASE_URL}/users/me/`, {
          headers: {
            'Authorization': `Token ${data.auth_token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
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
        setAuthToken('');
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

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {showLogin ? (
          <>
            <h2>Login</h2>
            <div className="input-container">
              <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} />
            </div>
            <div className="input-container">
              <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button className="btn-login" onClick={handleLogin}>Login</button>
            <p>
              Don't have an account?{' '}
              <button className="btn-toggle" onClick={toggleForm}>Create Account</button>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <div className="input-container">
              <input type="text" placeholder="Username" onChange={(e) => setRegisterUsername(e.target.value)} />
            </div>
            <div className="input-container">
              <input type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} />
            </div>
            <button className="btn-register" onClick={handleRegister}>Register</button>
            <p>
              Already have an account?{' '}
              <button className="btn-toggle" onClick={toggleForm}>I Have an Account</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
