import React, { useEffect, useState } from "react";
import axios from "axios";

const Forum = () => {
  const [posts, setPosts] = useState([]);

  // State for new post inputs & errors
  const [newPost, setNewPost] = useState({
    username: "",
    email: "",
    title: "",
    content: "",
    category: "",
    tags: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const maxContentLength = 300;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5002/api/forum");
    setPosts(res.data);
  };

  // Validate new post fields
  const validate = () => {
    const newErrors = {};
    if (!newPost.username.trim()) newErrors.username = "Name is required";
    if (!newPost.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newPost.email))
      newErrors.email = "Email is invalid";
    if (!newPost.title.trim()) newErrors.title = "Title is required";
    if (!newPost.content.trim()) newErrors.content = "Content is required";
    if (newPost.content.length > maxContentLength)
      newErrors.content = `Content max length is ${maxContentLength}`;
    if (!newPost.category) newErrors.category = "Please select a category";
    return newErrors;
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleRatingChange = (rating) => {
    setNewPost({ ...newPost, rating });
  };

  const handlePostSubmit = async () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    await axios.post("http://localhost:5002/api/forum/create", newPost);
    setNewPost({
      username: "",
      email: "",
      title: "",
      content: "",
      category: "",
      tags: "",
      rating: 0,
    });
    setErrors({});
    fetchPosts();
  };

  const handleCommentSubmit = async (postId, comment, username) => {
    if (!username.trim() || !comment.trim()) return;
    await axios.post(`http://localhost:5002/api/forum/${postId}/comment`, {
      content: comment,
      username,
    });
    fetchPosts();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🗨️ Community Forum</h2>

      {/* New Post Form */}
      <div style={styles.newPostForm}>
        <input
          name="username"
          type="text"
          placeholder="Your name"
          value={newPost.username}
          onChange={handleInputChange}
          style={{
            ...styles.input,
            borderColor: errors.username ? "red" : "#ccc",
          }}
        />
        {errors.username && (
          <small style={styles.error}>{errors.username}</small>
        )}

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={newPost.email}
          onChange={handleInputChange}
          style={{
            ...styles.input,
            borderColor: errors.email ? "red" : "#ccc",
          }}
        />
        {errors.email && <small style={styles.error}>{errors.email}</small>}

        <input
          name="title"
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          style={{
            ...styles.input,
            borderColor: errors.title ? "red" : "#ccc",
          }}
        />
        {errors.title && <small style={styles.error}>{errors.title}</small>}

        <select
          name="category"
          value={newPost.category}
          onChange={handleInputChange}
          style={{
            ...styles.select,
            borderColor: errors.category ? "red" : "#ccc",
          }}
        >
          <option value="">Select Category</option>
          <option value="doubt">Doubt</option>
          <option value="experience">Experience</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <small style={styles.error}>{errors.category}</small>
        )}

        {/* Show tags input only if category is feedback */}
        {newPost.category === "feedback" && (
          <input
            name="tags"
            type="text"
            placeholder="Tags (comma separated)"
            value={newPost.tags}
            onChange={handleInputChange}
            style={styles.input}
          />
        )}

        <textarea
          name="content"
          placeholder="Share your doubt or experience..."
          value={newPost.content}
          onChange={handleInputChange}
          maxLength={maxContentLength}
          style={{
            ...styles.textarea,
            borderColor: errors.content ? "red" : "#ccc",
          }}
        />
        <div style={styles.charCounter}>
          {newPost.content.length} / {maxContentLength} characters
        </div>
        {errors.content && <small style={styles.error}>{errors.content}</small>}

        <div style={styles.ratingContainer}>
          <label style={{ marginRight: 10 }}>Rate your experience:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={newPost.rating >= star}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>

        <button onClick={handlePostSubmit} style={styles.submitButton}>
          Post
        </button>
      </div>

      <hr style={styles.hr} />

      {/* Posts */}
      {posts.map((post) => (
        <div key={post._id} style={styles.postContainer}>
          <h3 style={styles.postTitle}>{post.title}</h3>
          <p>{post.content}</p>
          <small style={styles.postInfo}>
            By: {post.username} ({post.email || "No email"}) on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </small>
          <div style={{ margin: "8px 0" }}>
            Rating:{" "}
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} filled={post.rating >= star} />
            ))}
          </div>

          <h4>Comments:</h4>
          <ul style={styles.commentList}>
            {post.comments.map((c, i) => (
              <li key={i} style={styles.commentItem}>
                <b>{c.username}:</b> {c.content}
              </li>
            ))}
          </ul>

          <CommentForm postId={post._id} onSubmit={handleCommentSubmit} />
        </div>
      ))}
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: onClick ? "pointer" : "default",
      color: filled ? "#ffc107" : "black",
      fontSize: "1.5em", 
      fontWeight: "bold", 
      marginRight: 5,
      userSelect: "none",
      
    }}
  >
    ★
  </span>
);


const CommentForm = ({ postId, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div style={styles.commentForm}>
      <input
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={() => {
          onSubmit(postId, comment, username);
          setComment("");
        }}
        style={styles.submitButton}
      >
        Comment
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  newPostForm: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "1.1em",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s",
  },
  select: {
    padding: "12px",
    fontSize: "1.1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "white",
    color: "black",
  },
  textarea: {
    padding: "12px",
    fontSize: "1.1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "black",
    outline: "none",
    height: "120px",
    resize: "vertical",
    transition: "border 0.3s",
  },
  submitButton: {
    padding: "12px 20px",
    fontSize: "1.1em",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "flex-start",
    userSelect: "none",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
  },
  charCounter: {
    fontSize: "0.9em",
    color: "#666",
    textAlign: "right",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
  },
  hr: {
    margin: "40px 0",
    borderColor: "#ddd",
  },
  postContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  postTitle: {
    margin: "0 0 10px",
    fontSize: "1.8em",
    color: "#007bff",
  },
  postInfo: {
    fontSize: "0.8em",
    color: "#777",
    marginBottom: "10px",
  },
  commentList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  commentItem: {
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  commentForm: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
};

export default Forum;
