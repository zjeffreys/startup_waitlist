import React, { useState } from 'react';
import './Authentication.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://startupwaitlist-production.up.railway.app/auth';

const Authentication = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [msg , setSystemMsg] = useState('');


  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const isSessionTokenSet = () => {
    const sessionToken = sessionStorage.getItem('token');
    return !!sessionToken; // Return true if the session token is set, otherwise false
  }

  const handleLogin = async () => {
    if(isSessionTokenSet()){
      navigate('/my-waitlists', { replace: true });
      window.location.reload();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/token/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername.toLowerCase(), password: loginPassword, email: loginUsername.toLowerCase() }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', JSON.stringify(data.auth_token))
        console.log("Successfully Logged in")
        setSystemMsg("Successfully Logged In")
        navigate('/my-waitlists', { replace: true })
        window.location.reload()
        
      } else {
        console.error('Login failed');
        setSystemMsg('Login failed')
      }
    } catch (error) {
      setSystemMsg(error)
      console.error('Error during login:', error);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     if (!authToken) {
  //       console.error('No auth token available. Cannot log out.');
  //       return;
  //     }

  //     const response = await fetch(`${API_BASE_URL}/token/logout/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Token ${authToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       setLoggedIn(false);
  //       setAuthToken('');
  //     } else {
  //       console.error('Logout failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername.toLowerCase(), password: registerPassword, email: loginUsername.toLowerCase() }),
      });

      if (response.ok) {
        setSystemMsg('Registered successfully')
        console.log('Registered successfully')
        response.json().then(data => {

          console.log('Response data:', data);
        });
        // navigate('/my-waitlists', { replace: true })
        window.location.reload();
        setLoginUsername('')
        setLoginPassword('')
      } else {
        console.error('Registration failed');
        setSystemMsg('Registration failed')

      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSystemMsg('Error during registration:', error)

    }
  };

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
      <p>{msg}</p>
        {showLogin ? (
          <>
            <h2>Login</h2>
            <div className="input-container">
              <input type="text" placeholder="Email" onChange={(e) => setLoginUsername(e.target.value)} />
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
              <input type="email" placeholder="Email" onChange={(e) => setRegisterUsername(e.target.value)} />
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
