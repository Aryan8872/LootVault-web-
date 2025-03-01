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
      console.error('User is not authenticated');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/forum/posts', {
        title: newPost.title,
        content: newPost.content,
        user: auth.id,
      });

      setNewPost({ title: '', content: '' });
      onCreate();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            rows={3}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-md"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;