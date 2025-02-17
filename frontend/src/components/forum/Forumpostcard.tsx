import React from 'react';
import axios from 'axios';

interface Props {
  post: any;
  auth: any;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const PostCard = ({ post, onLike, onDislike, onComment }: Props) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-interactions">
        <button onClick={() => onLike(post._id)}>👍</button>
        <button onClick={() => onDislike(post._id)}>👎</button>
        <span>Likes: {post.likes?.length || 0}</span>
        <span>Dislikes: {post.dislikes?.length || 0}</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newComment = e.target.elements.comment.value;
          onComment(post._id, newComment);
          e.target.elements.comment.value = '';
        }}
        className="comment-form"
      >
        <input type="text" name="comment" placeholder="Add a comment" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostCard;