const express = require('express');
const router = express.Router();
const {
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
    getComments
    
} = require('../config/controller/forumPostController'); // Adjust the path if necessary


router.get('/posts', getAllPosts); // This line causes the error if getAllPosts is undefined
router.post('/posts', createPost);

router.put('/posts/like/:id', likePost);
router.put('/posts/dislike/:id', dislikePost);

router.post('/posts/comments/:id', addComment);
router.get('/posts/comments/get/:id', getComments);

router.put('/posts/:id/comments/:commentId', editComment);
router.delete('/posts/:id/comments/:commentId', deleteComment);
router.post('/posts/:postId/comments/:commentId/reply', addReply);

router.delete('/posts/:id', deletePost);
router.put('/posts/:id', editPost);

module.exports = router;