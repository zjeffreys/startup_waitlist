// import logo from './logo.svg';
// import './App.css';
 

// import HeroesList from './components/HeroesList'; // Import the component from the components directory

// const App = () => {
//   return (
//     <div>
//       <h1>My Superhero App</h1>
//       <HeroesList /> {/* Use the imported HeroesList component */}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

const LoginForm = ({ setLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}login/`, loginData);
      const token = response.data.access;
      // Store the token in local storage or cookies
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        value={loginData.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

const RegistrationForm = ({ setLoggedIn }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}register/`, registerData);
      setLoggedIn(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        name="username"
        value={registerData.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <input
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button type="submit">Register</button>
    </form>
  );
};

const Projects = () => {
  return (
    <div>
      <h2>Welcome to Projects</h2>
      {/* Your Projects component content here */}
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
          <LoginForm setLoggedIn={setLoggedIn} />
          <h2>Register</h2>
          <RegistrationForm setLoggedIn={setLoggedIn} />
        </div>
      ) : (
        <Projects />
      )}
    </div>
  );
};

export default App;
