import axios from 'axios';
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
}

const ForumApp = () => {
  const [state, setState] = useState<ForumState>({
    loading: true,
    error: null,
    posts: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });

  const { userData } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [state.currentPage, userData]);

  console.log(userData)


  const fetchPosts = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await axios.get(`http://localhost:3000/api/forum/posts?page=${state.currentPage}&limit=${state.limit}`);

      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
        posts: response.data.posts || [],  // Ensure posts is always an array
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 0,
        currentPage: response.data.currentPage || prev.currentPage,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load posts',
        posts: [],  // Ensure posts is always an array
      }));
    }
  };


  // Define Missing Functions
  const likePost = async (postId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/forum/posts/${postId}/like`,{
        user:userData
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const dislikePost = async (postId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/forum/posts/${postId}/dislike`,{
        user:userData
      });      
      fetchPosts();
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const addComment = async (postId: string, comment: string) => {
    try {
      await axios.post(`http://localhost:3000/api/forum/posts/${postId}/comments`, { content: comment ,user:userData});
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="forum-container">
      {state.loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <PostForm
            onCreate={fetchPosts}
            auth={userData}
          />
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
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>

          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) => setState(prev => ({ ...prev, currentPage: page }))}
          />
        </>
      )}
    </div>
  );
};

export default ForumApp;