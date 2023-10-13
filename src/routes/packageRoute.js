const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const postController = require('../controlparts/post-controllers')

const router = express.Router();


router.get('/', authenticateMiddleware.authUser, postController.getPackage)

module.exports = router;