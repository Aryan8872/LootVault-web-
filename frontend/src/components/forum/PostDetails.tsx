import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Heart, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

interface IPost {
  _id: string;
  user: { _id: string; username: string };
  title: string;
  content: string;
  likes: string[];
  dislikes: string[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

interface IComment {
  _id: string;
  user: { _id: string; username: string };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/forum/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch post details');
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-10">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Post Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
          {post.user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500">By {post.user.username}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-6">
        <p className="text-gray-700">{post.content}</p>
      </div>

      {/* Post Stats */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <ThumbsUp size={18} />
          <span>{post.likes.length} Likes</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <ThumbsDown size={18} />
          <span>{post.dislikes.length} Dislikes</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle size={18} />
          <span>{post.comments.length} Comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Comments</h3>
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                {comment.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{comment.user.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 mt-2">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;