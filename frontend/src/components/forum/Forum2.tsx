import axios from 'axios';
import { Heart, MessageCircle, MoreHorizontal, Share2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
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

interface ForumState {
    loading: boolean;
    error: string | null;
    posts: IPost[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}
const SocialFeed = () => {
    const [state, setState] = useState<ForumState>({
        loading: true,
        error: null,
        posts: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 2,  // Set limit to 2 posts per page
    });

    const { userData } = useAuth();

    // Fetch posts on component mount or when the page changes
    useEffect(() => {
        fetchPosts();
    }, [state.currentPage, userData]);

    const fetchPosts = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.get(`http://localhost:3000/api/forum/posts?page=${state.currentPage}&limit=${state.limit}`);

            // Update the state with the fetched data
            setState(prev => ({
                ...prev,
                loading: false,
                error: null,
                posts: response.data.posts || [],
                total: response.data.total || 0,
                totalPages: response.data.totalPages || 0,
                currentPage: response.data.currentPage || prev.currentPage,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to load posts',
                posts: [],
            }));
        }
    };

    // Like post functionality
    const likePost = async (postId: string) => {
        try {
            await axios.put(`http://localhost:3000/api/forum/posts/${postId}/like`, { user: userData });
            fetchPosts();  // Re-fetch posts after action
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    // Dislike post functionality
    const dislikePost = async (postId: string) => {
        try {
            await axios.put(`http://localhost:3000/api/forum/posts/${postId}/dislike`, { user: userData });
            fetchPosts();  // Re-fetch posts after action
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };

    // Add comment functionality
    const addComment = async (postId: string, comment: string) => {
        try {
            await axios.post(`http://localhost:3000/api/forum/posts/${postId}/comments`, { content: comment, user: userData });
            fetchPosts();  // Re-fetch posts after action
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
            {/* Left Sidebar */}
            <div className="w-full md:w-64 shrink-0">
                <button className="w-full bg-emerald-400 text-white rounded-lg px-4 py-2 mb-6 font-medium">
                    + Post
                </button>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">My Bowls</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                            <span className="font-medium">Salaries in Tech</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full ml-auto" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full" />
                            <span className="font-medium">Jobs in Tech</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full" />
                            <span className="font-medium">Tech</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full" />
                            <span className="font-medium">Designers</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg w-full mt-4">
                        <Users size={20} />
                        <span>Explore Bowls</span>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full ml-auto" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Post Creation */}
     

                {/* Posts Feed */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full" />
                                <div>
                                    <div className="font-medium">Tech</div>
                                    <div className="text-sm text-gray-600">Product Designer</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">3d</span>
                                <MoreHorizontal size={20} className="text-gray-500" />
                            </div>
                        </div>
                        <p className="mb-4">
                            Is there any UX strategists here willing to share their salary? I have 3 YOE currently
                            interviewing for a UX strategist position and want to know what others are making as well. Thank you!!
                        </p>
                        <div className="flex items-center gap-6 text-gray-500">
                            <button className="flex items-center gap-2">
                                <Heart size={20} />
                                <span>Like</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <MessageCircle size={20} />
                                <span>3 Comments</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <Share2 size={20} />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full md:w-80 shrink-0">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Bowls™ for you</h2>
                        <a href="#" className="text-emerald-500 font-medium">
                            Explore All Bowls →
                        </a>
                    </div>

                    <div className="space-y-4">
                        {['Work-Life Bowl', 'Job Referrals!', 'Personal Investment Chatter'].map((bowl, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg" />
                                <div className="flex-1">
                                    <h3 className="font-medium">{bowl}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        A community for professionals...
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Users size={16} />
                                            <span>{(index + 1) * 10}K</span>
                                        </div>
                                        <div className="space-x-2">
                                            <button className="px-3 py-1 text-sm border rounded-lg">View</button>
                                            <button className="px-3 py-1 text-sm border rounded-lg">Join</button>
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

export default SocialFeed;