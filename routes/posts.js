const express = require('express');
const { getPosts, createPost, postsByUser, postById, isPoster, updatePost, deletePost} = require('../controllers/posts');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const validator = require('../validator/index')

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, validator.createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.param("userId", userById);
router.param("postId", postById);


module.exports = router;
