const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, getPosts } = require('../controllers/communityController');

router.get('/', getPosts);
router.post('/', auth, createPost);

module.exports = router;
