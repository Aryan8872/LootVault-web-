import axios from 'axios';
import React, { useState } from 'react';

interface Props {
  onCreate: () => void;
  auth: any;
}

const PostForm = ({ onCreate, auth }: Props) => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !auth.id) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/forum/posts', {
        title: newPost.title,
        content: newPost.content,
        user: auth.id,  // Send user ID in request body
      });

      setNewPost({ title: '', content: '' });
      onCreate();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;