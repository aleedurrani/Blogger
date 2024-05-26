import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './BlogList';
import Signup from './Signup';
import NavBar from './NavBar';
import Login from './Login';
import BlogPostDetails from './BlogPostDetail';
import AddBlog from './AddBlog';
import Notification from './Notification';


const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog-post/:id" element={<BlogPostDetails />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
