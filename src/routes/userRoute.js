const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const userController = require('../controlparts/user-controllers');


const router = express.Router();

router.get('/profile', authenticateMiddleware.authUser, userController.getProfile)


module.exports = router;