// DeleteBlog.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const DeleteBlog = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    fetch(`${apiUrl}blog/blog-post/${id}`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBlogPost(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleDelete = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}blog/blog-post/${id}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}`);
        alert("You cannot delete this blog");
      }

      // Navigate back to the blog list after deleting the blog
      navigate('/blog-list');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Delete Blog</h1>
      <p>Are you sure you want to delete the blog titled "{blogPost.title}"?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/blog-post/${id}`)}>Cancel</button>
    </div>
  );
};

export default DeleteBlog;
