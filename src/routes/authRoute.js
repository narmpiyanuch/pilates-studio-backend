const express = require('express');

const authController = require('../controlparts/auth-controllers');
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post('/register', uploadMiddleware.single("profileImg"), authController.register);
router.post('/login', authController.login);

module.exports = router;