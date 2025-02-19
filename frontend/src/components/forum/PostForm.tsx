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
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full" />
            <input

              type="text"
              placeholder='Title"'
              className="flex-1 border rounded-lg px-4 py-2"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
              type="text"
              placeholder='Content"'
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="flex-1 border rounded-lg px-4 py-2"
            />
          </div>
          <button
            className='flex self-end'
            type="submit">Post</button>

        </form>
      </div>

    </>
  );
};

export default PostForm;