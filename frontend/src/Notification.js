import React, { useState, useEffect } from 'react';
import styles from './Notifications.module.css';
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${apiUrl}interaction/notifications`, {
          method: 'GET',
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [apiUrl]);

  return (
    <div className={styles.container}>
    <h1>Notifications</h1>
    <ul>
      {notifications.map((notification, index) => (
        <li key={index}>{notification}</li>
      ))}
    </ul>
  </div>
  );
};

export default Notification;
