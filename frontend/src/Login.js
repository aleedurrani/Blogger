// Login.js

import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('User logged in successfully');
        localStorage.setItem('token', data.token);
        // Navigate to the main page or the protected route
        navigate('/blog-list');
      } else {
        console.error('Login failed:', data.error);
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login Page</h1>
      {errorMessage && (
        <div className={styles.errorDialog}>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)}>Close</button>
        </div>
      )}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.loginLabel}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.loginInput}
            required
          />
        </label>
        <label className={styles.loginLabel}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.loginInput}
            required
          />
        </label>
        <button type="submit" className={styles.loginButton}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
