import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface IComment {
  _id: string;
  user: { _id: string; username: string };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IPost {
  _id: string;
  user: { _id: string; username: string };
  title: string;
  content: string;
  comments: IComment[];
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/forum/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:3000/api/forum/posts/${id}/comments`, {
        content: newComment,
      });
      setNewComment('');
      setPost((prevPost) => (prevPost ? { ...prevPost, comments: [...prevPost.comments, { content: newComment, user: { username: 'YourUsername' } }] } : prevPost));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/forum/posts/${id}/comments/${commentId}`);
      setPost((prevPost) => ({
        ...prevPost!,
        comments: prevPost!.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div className="comments">
        <h2>Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.user.username}</strong>: {comment.content}</p>
            {comment.user._id === 'YourUserId' && (
              <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>

      <div className="add-comment">
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default PostDetail;
