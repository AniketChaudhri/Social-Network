const express = require('express');
const { getPosts, createPost} = require('../controllers/posts');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const validator = require('../validator/index')

router.get("/", requireSignin, getPosts);
router.post("/post", validator.createPostValidator, createPost);

module.exports = router;
