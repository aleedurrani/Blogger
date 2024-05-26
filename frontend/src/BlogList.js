import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}blog/blog-posts`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddBlogClick = () => {
    navigate('/add-blog');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Blog List</h1>
      <button onClick={handleAddBlogClick}>Add Blog</button>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul id="blog">
        {filteredBlogs.map((blog) => (
          <li id="blog" key={blog._id}>
            <Link to={`/blog-post/${blog._id}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
