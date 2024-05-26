import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddBlog.module.css';
const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddBlogSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}blog/blog-post`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Navigate back to the blog list after adding a new blog
      navigate('/blog-list');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Blog</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label>Content:</label>
      <textarea value={content} onChange={handleContentChange}></textarea>
      <button onClick={handleAddBlogSubmit}>Submit</button>
    </div>
  );
};

export default AddBlog;
