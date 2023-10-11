const express = require('express');

const authController = require('../controlparts/auth-controllers')

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;