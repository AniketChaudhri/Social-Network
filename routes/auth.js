const express = require('express');
const { signup } = require('../controllers/auth');
const router = express.Router();
const { userSignupValidator } = require('../validator/index')

router.post("/signup", userSignupValidator, signup);

module.exports = router;
