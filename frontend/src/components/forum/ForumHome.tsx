import axios from 'axios';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import PostCard from './Forumpostcard';
import Pagination from './Pagination';
import PostForm from './PostForm';

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

interface ForumState {
  loading: boolean;
  error: string | null;
  posts: IPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}

const ForumApp = () => {
  const [state, setState] = useState<ForumState>({
    loading: true,
    error: null,
    posts: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 2,
    search: '',
  });

  const { userData } = useAuth();

  // Fetch posts on component mount or when the page changes
  useEffect(() => {
    fetchPosts();
  }, [state.currentPage, state.search, userData]);

  const fetchPosts = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios.get('http://localhost:3000/api/forum/posts', {
        params: {
          page: state.currentPage,
          limit: state.limit,
          search: state.search,
          userData: userData,
        },
      });

      setState((prev) => ({
        ...prev,
        loading: false,
        posts: response.data.posts || [],
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 0,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load posts',
      }));
    }
  };

  // Like post functionality
  const likePost = async (postId: string, setDislike: (v: boolean) => boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/forum/posts/like/${postId}`, { user: userData });
      setDislike(false);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Dislike post functionality
  const dislikePost = async (postId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/forum/posts/dislike/${postId}`, { user: userData });
      fetchPosts();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  // Add comment functionality
  const addComment = async (postId: string, comment: string) => {
    try {
      await axios.post(`http://localhost:3000/api/forum/posts/comments/${postId}`, { content: comment, user: userData });
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Delete post functionality
  const deletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/forum/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Edit post functionality
  const onEdit = async (postId: string, editedTitle: string, editedContent: string) => {
    try {
      await axios.put(`http://localhost:3000/api/forum/posts/${postId}`, {
        title: editedTitle,
        content: editedContent,
      });
      fetchPosts();
    } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg px-4 py-2 mb-6 font-medium hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-lg">
          + Post
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">My Bowls</h2>
          <div className="space-y-3">
            {['Salaries in Tech', 'Jobs in Tech', 'Tech', 'Designers'].map((bowl, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    index === 0
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                      : index === 1
                      ? 'bg-blue-100'
                      : index === 2
                      ? 'bg-yellow-100'
                      : 'bg-purple-100'
                  }`}
                />
                <span className="font-medium">{bowl}</span>
                {index === 0 && <div className="w-2 h-2 bg-emerald-400 rounded-full ml-auto" />}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg w-full mt-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md">
            <Users size={20} />
            <span>Explore Bowls</span>
            <div className="w-2 h-2 bg-white rounded-full ml-auto" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6 w-full">
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="text"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              placeholder="Search posts..."
              value={state.search}
              onChange={(e) => setState((prev) => ({ ...prev, search: e.target.value }))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

        {/* Post Creation */}
        <PostForm onCreate={fetchPosts} auth={userData} />

        {/* Posts Feed */}
        <div className="post-grid">
          {Array.isArray(state.posts) && state.posts.length > 0 ? (
            state.posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                auth={userData}
                onLike={likePost}
                onDislike={dislikePost}
                onComment={addComment}
                onDelete={deletePost}
                onEdit={onEdit}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts available. Be the first to share something!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="w-full mt-5 flex items-center justify-center">
          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) => setState((prev) => ({ ...prev, currentPage: page }))}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-80 shrink-0">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Bowls™ for you</h2>
            <a href="#" className="text-emerald-500 font-medium hover:text-emerald-600 transition-all duration-200">
              Explore All Bowls →
            </a>
          </div>

          <div className="space-y-4">
            {['Work-Life Bowl', 'Job Referrals!', 'Personal Investment Chatter'].map((bowl, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-medium">{bowl}</h3>
                  <p className="text-sm text-gray-600 mb-2">A community for professionals...</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users size={16} />
                      <span>{(index + 1) * 10}K</span>
                    </div>
                    <div className="space-x-2">
                      <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition-all duration-200">
                        View
                      </button>
                      <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumApp;