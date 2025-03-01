import { Heart, MessageCircle, MoreHorizontal, Pencil, Share2, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


interface Props {
  post: any;
  auth: any;
  onLike: (postId: string, setDislike: any) => void;
  onDislike: (postId: string, setLike: any) => void;
  onComment: (postId: string, comment: string) => void;
  onDelete: (postId: string) => void;
  onEdit: (postId: string, editedTitle: string, editedContent: string) => void;
}


const PostCard = ({ post, auth, onLike, onDislike, onComment, onDelete, onEdit }: Props) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedTitle, setEditedTitle] = useState(post.title);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleEdit = async () => {
    try {
      await onEdit(post._id, editedTitle, editedContent); // Pass edited data
      setIsEditing(false); // Close the edit mode
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 relative"
    onClick={()=>navigate(`/post/${post._id}`)}
    >
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full" />
          <div>
            <div className="font-medium">{post.user.username}</div>
            <div className="text-sm text-gray-600">{post.user.email}</div>
          </div>
        </div>

        {/* More Options */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500">
            <MoreHorizontal size={20} />
          </button>

          {menuOpen && post.user._id === auth.id && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsEditing(true); // Open edit mode
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Pencil size={16} /> Edit Post
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(post._id);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash size={16} /> Delete Post
                </button>
              </>
            </motion.div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="flex flex-col gap-3">
        {isEditing ? (
          <>
            {/* Editable Title */}
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
            {/* Editable Content */}
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="border p-2 rounded-lg w-full"
              rows={4}
            />
          </>
        ) : (
          <>
            {/* Display Title */}
            <span className="font-bold">{post.title}</span>
            {/* Display Content */}
            <p>{post.content}</p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-500">
        <button className="flex items-center gap-2">
          <Heart
            onClick={() => onLike(post._id, setDisliked)}
            size={20}
            fill={liked ? "red" : "white"}
          />
          <span>{post.likes?.length || 0} Like</span>
        </button>
        <button className="flex items-center gap-2">
          <Heart
            onClick={() => onDislike(post._id, setLiked)}
            size={20}
            fill={disliked ? "red" : "white"}
          />
          <span>{post.dislikes?.length || 0} Dislike</span>
        </button>
        <button className="flex items-center gap-2" onClick={() => setVisible(!visible)}>
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Input */}
      {visible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newComment = e.target.elements.comment.value;
            onComment(post._id, newComment);
            e.target.elements.comment.value = "";
          }}
          className="mt-3 flex items-center space-x-2"
        >
          <input
            type="text"
            name="comment"
            placeholder="Add a comment"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Post
          </button>
        </form>
      )}

      {/* Save Changes Button */}
      {isEditing && (
        <button
          onClick={handleEdit}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default PostCard;
