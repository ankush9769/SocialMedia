import React, { useState, useEffect } from 'react'
// import { useAuth } from '../context/AuthContext'
import axios from 'axios';

const Home = () => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  // fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', { withCredentials: true });
      console.log("data comes from the server", res.data)
      if (res.data.allposts && Array.isArray(res.data.allposts)) {
        setPosts(res.data.allposts);
      } else {
        console.error("No posts found or wrong format:", res.data);
      }
    } catch (err) {
      console.log('Failed to load posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/posts/create', { content }, { withCredentials: true });
      setContent('');
      fetchPosts(); // refresh post list
    } catch (err) {
      console.error('Failed to post');
    }
  };
  return (
    <div className="container my-5">
        <style>
        {`
          textarea::placeholder {
            color: white !important; /* Change placeholder color */
          }
        `}
      </style>
      <form onSubmit={handleCreatePost} className="mb-4">
        <div className="mb-3 " >
          <textarea
            className="form-control bg-dark text-white"
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows="3"
            style={{ color: "white" }} // Applies text color inside the textarea
          />
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      <h3 className="mb-4">All Posts</h3>

      {posts.length > 0 ? (
        posts.map((post, i) => (
          <div key={i} className="card mb-3 ">
            <div className="card-body ">
              <h5 className="card-title " style={{ color: "white" }}>{post.author.username || "Unknown User"}</h5>
              <p className="card-text">{post.content}</p>
              <p className="card-text" style={{ color: "white", display: "flex", justifyContent: "end" }}>
                <small className="text" >{new Date(post.createdAt).toLocaleString()}</small>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">No posts yet.</div>
      )}
    </div>

  )
}

export default Home
