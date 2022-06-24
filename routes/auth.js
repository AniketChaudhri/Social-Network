const express = require('express');
const { signup, signin } = require('../controllers/auth');
const router = express.Router();
const { userSignupValidator } = require('../validator/index')

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

module.exports = router;
