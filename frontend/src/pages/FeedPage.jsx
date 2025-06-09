import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts.map(post => (
        <div key={post._id}>
          <img src={post.image} alt="post" width="200" />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}
