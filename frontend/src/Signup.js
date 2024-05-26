import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing
    setErrorMessage(null);
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If the form is not valid, don't proceed with the submission
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('User registered successfully:', data.message);
        navigate('/blog-list');
      } else {
        console.error('Registration failed:', data.error);
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <div className={styles['signupContainer']}>
      <h1 className={styles['signupTitle']}>Signup Page</h1>
      {errorMessage && (
        <div className={styles['errorDialog']}>
          <p>{errorMessage}</p>
          <button onClick={closeErrorMessage}>Close</button>
        </div>
      )}
      <form className={styles['signupForm']} onSubmit={handleSubmit}>
        <label className={styles['signupLabel']}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles['signupInput']}
            required
          />
          {formErrors.username && <span className={styles['errorText']}>{formErrors.username}</span>}
        </label>
        <label className={styles['signupLabel']}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles['signupInput']}
            required
          />
          {formErrors.email && <span className={styles['errorText']}>{formErrors.email}</span>}
        </label>
        <label className={styles['signupLabel']}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles['signupInput']}
            required
          />
          {formErrors.password && <span className={styles['errorText']}>{formErrors.password}</span>}
        </label>
        <label className={styles['signupLabel']}>
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles['signupSelect']}
          >
            <option value="user">User</option>
          </select>
          {formErrors.role && <span className={styles['errorText']}>{formErrors.role}</span>}
        </label>
        <button type="submit" className={styles['signupButton']}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
