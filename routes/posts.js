const express = require('express');
const { getPosts, createPost} = require('../controllers/posts');
const router = express.Router();
const validator = require('../validator/index')

router.get("/", getPosts);
router.post("/post", validator.createPostValidator, createPost);

module.exports = router;
