import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IComment, PostModel } from "../../models/forumPostModel";

interface ForumRequest extends Request {
    user?: {
        id: Types.ObjectId;
        role: string;
    };
}
// Create a new post
const createPost = async (req: ForumRequest, res: Response) => {
    try {
        const { title, content } = req.body;
        const user = req.body.user// Assuming req.user is available from middleware

        // if (!user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        console.log(req.body)

        const newPost = new PostModel({ user, title, content });
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all posts with pagination
const getAllPosts = async (req: ForumRequest, res: Response) => {
    try {
        const { search } = req.query;
        const page = parseInt(req.query.page as string) - 1 || 0;
        const limit = 2;

        let query: any = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } },
                ],
            };
        }

        const posts = await PostModel.find(query)
            .populate("user", "_id username email")
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(limit);

        const total = await PostModel.countDocuments(query);
        res.status(200).json({ total, posts, currentPage: page + 1 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const likePost = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.body.user;
        console.log(user)

        if (!user || !user.id) {
            return res.status(400).json({ message: 'Invalid user data' });
        }
        console.log("dawd")

        const userId = new mongoose.Types.ObjectId(user.id);

        // Fetch the post and populate likes & dislikes
        const post = await PostModel.findById(id).populate('likes dislikes', '_id',).populate('user', '_id username email');

        ;
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Remove dislike if the user had previously disliked
        post.dislikes = post.dislikes.filter((dislike: mongoose.Types.ObjectId) => !dislike.equals(userId));

        // Check if the user already liked the post
        const likeIndex = post.likes.findIndex((like: mongoose.Types.ObjectId) => like.equals(userId));
        if (likeIndex > -1) {
            // Remove the like if already liked
            post.likes.splice(likeIndex, 1);
        } else {
            // Add the like if not already liked
            post.likes.push(userId);
        }

        // Save the updated post
        await post.save();

        // Respond with the updated post
        console.log(post)
        res.status(200).json(post);
    } catch (error) {
        console.error('Error processing like/unlike:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const dislikePost = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.body.user;

        // Handle both string and object formats
        const userId = typeof user === 'string' ? new mongoose.Types.ObjectId(user) :
                      user?.id ? new mongoose.Types.ObjectId(user.id) : null;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        const post = await PostModel.findById(id)
            .populate('likes dislikes', '_id')
            .populate('user', '_id username email');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Remove like if previously liked
        post.likes = post.likes.filter((like: mongoose.Types.ObjectId) => !like.equals(userId));

        // Toggle dislike
        const dislikeIndex = post.dislikes.findIndex((dislike: mongoose.Types.ObjectId) => dislike.equals(userId));
        if (dislikeIndex > -1) {
            post.dislikes.splice(dislikeIndex, 1);
        } else {
            post.dislikes.push(userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error('Error disliking post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getComments = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Find the post by ID
        const post = await PostModel.findById(id).populate('comments.user', 'username'); // Assuming 'comments.user' is a reference to a User model

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return the comments from the post
        res.status(200).json(post.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const addComment = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const user = req.body.user?.id; // Assuming req.user is available from middleware
        console.log(user);
        console.log(content);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            user: user as Types.ObjectId,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as IComment; // Type assertion here

        console.log("New Comment:", newComment); // Log for debugging

        post.comments.push(newComment);

        const updatedPost = await post.save(); // Save the updated post
        res.status(201).json(updatedPost.comments[updatedPost.comments.length - 1]);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const addReply = async (req: Request, res: Response) => {
    try {
        const { postId, commentId } = req.params;
        const { content } = req.body;
        const user = req.body.user;

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        if (!content) return res.status(400).json({ message: "Content is required" });

        // Find the post by postId
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Find the comment within the post's comments array
        const comment = (post.comments as Types.DocumentArray<any>).id(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Create a new reply object
        const newReply = {
            _id: new Types.ObjectId(),
            user: new Types.ObjectId(user),
            content,
            replies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Push the new reply into the replies array of the comment
        comment.replies.push(newReply);

        // Save the updated post document
        await post.save();

        res.status(201).json(newReply);
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  




// Edit a comment
const editComment = async (req: ForumRequest, res: Response) => {
    try {
        const { postId, commentId } = req.params;
        const { content } = req.body;
        const user = req.user?.id; // Assuming req.user is available from middleware

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentIndex = post?.comments.findIndex(
            (c: IComment) => c._id.toString() === commentId
        ); if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = post.comments[commentIndex];
        if (comment.user.toString() !== user.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.content = content;
        comment.updatedAt = new Date();
        await post.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a comment
const deleteComment = async (req: ForumRequest, res: Response) => {
    try {
        const { postId, commentId } = req.params;
        const user = req.user?.id; // Assuming req.user is available from middleware

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentIndex = post.comments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = post.comments[commentIndex];
        if (comment.user.toString() !== user.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        post.comments = post.comments.filter(c => c._id.toString() !== commentId);
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a post
const deletePost = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user?.id;

        const post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });


        await PostModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Edit a post
const editPost = async (req: ForumRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const user = req.user?.id;

        const post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });



        post.title = title;
        post.content = content;
        post.updatedAt = new Date();
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error("Error editing post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    likePost,
    dislikePost,
    addComment,
    editComment,
    deleteComment,
    deletePost,
    editPost,
    addReply,
    getComments,
};