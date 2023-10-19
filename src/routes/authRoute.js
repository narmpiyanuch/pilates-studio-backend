const express = require('express');

const authController = require('../controlparts/auth-controllers');
const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

// router.post('/register', uploadMiddleware.single("profileImg"), authController.register);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticateMiddleware, authController.getMe);

module.exports = router;

