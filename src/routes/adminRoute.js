const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const postController = require('../controlparts/post-controllers')

const router = express.Router();

router.post('/createclass', authenticateMiddleware.authCreateClass, postController.createClassName)
router.post('/createpackage', authenticateMiddleware.authCreateClass, postController.createPackage)

module.exports = router;