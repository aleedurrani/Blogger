// EditBlog.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const EditBlog = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
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

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}blog/blog-post/${id}`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}`);
        alert("You cannot edit this blog");
       
      }
      // Navigate back to the blog post details after editing the blog
      navigate(`/blog-list`);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Blog</h1>
      <label>Title:</label>
      <input type="text" value={editTitle} onChange={handleEditTitleChange} />
      <label>Content:</label>
      <textarea value={editContent} onChange={handleEditContentChange}></textarea>
      <button onClick={handleEditSubmit}>Submit Edit</button>
    </div>
  );
};

export default EditBlog;
