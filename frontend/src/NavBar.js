import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/blog-list">Home</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/notifications">Notifications</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
