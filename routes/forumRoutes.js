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
} = require('../config/controller/forumPostController'); // Adjust the path if necessary


router.get('/posts', getAllPosts); // This line causes the error if getAllPosts is undefined
router.post('/posts', createPost);

router.put('/posts/:id/like', likePost);
router.put('/posts/:id/dislike', dislikePost);

router.post('/posts/:id/comments', addComment);
router.put('/posts/:id/comments/:commentId', editComment);
router.delete('/posts/:id/comments/:commentId', deleteComment);

router.delete('/posts/:id', deletePost);
router.put('/posts/:id', editPost);

module.exports = router;