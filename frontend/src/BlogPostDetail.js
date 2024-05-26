// BlogPostDetails.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import EditBlog from './EditBlog';
import DeleteBlog from './DeleteBlog';

const BlogPostDetails = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}blog/blog-post/${id}/comment`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch the updated blog post after a comment is posted
      const updatedResponse = await fetch(`${apiUrl}blog/blog-post/${id}`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!updatedResponse.ok) {
        throw new Error(`HTTP error! Status: ${updatedResponse.status}`);
      }

      const updatedData = await updatedResponse.json();
      setBlogPost(updatedData);
      setCommentInput(''); // Clear the comment input field
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleRatingChange = (e) => {
    setRatingInput(e.target.value);
  };

  const handleRatingSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}blog/blog-post/${id}/rate`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: ratingInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch the updated blog post after a rating is submitted
      const updatedResponse = await fetch(`${apiUrl}blog/blog-post/${id}`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!updatedResponse.ok) {
        throw new Error(`HTTP error! Status: ${updatedResponse.status}`);
      }

      const updatedData = await updatedResponse.json();
      setBlogPost(updatedData);
      setRatingInput(''); // Clear the rating input field
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  if (!blogPost) {
    return <div>Login to see</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{blogPost.title}</h1>
      <h2>Content</h2>
      <p>{blogPost.content}</p>
      <h2>Owner</h2>
      <p>{blogPost.owner}</p>
      <h2>Comments</h2>
      <ul>
        {blogPost.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <h2>Ratings</h2>
      <ul>
        {blogPost.ratings.map((rating, index) => (
          <li key={index}>{rating}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={commentInput}
          onChange={handleCommentChange}
          placeholder="Enter your comment"
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
      <div>
        <input
          type="text"
          value={ratingInput}
          onChange={handleRatingChange}
          placeholder="Enter your rating"
        />
        <button onClick={handleRatingSubmit}>Submit Rating</button>
      </div>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>

      {showEdit && <EditBlog />}
      {showDelete && <DeleteBlog />}
    </div>
  );
};

export default BlogPostDetails;
