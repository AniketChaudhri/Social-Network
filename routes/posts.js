const express = require('express');
const { getPosts, createPost} = require('../controllers/posts');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const validator = require('../validator/index')

router.get("/", getPosts);
router.post("/post", requireSignin, validator.createPostValidator, createPost);
router.param("userId", userById);

module.exports = router;
