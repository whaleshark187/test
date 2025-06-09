const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPosts, createPost, likePost, addComment } = require('../controllers/postController');

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);

module.exports = router;
