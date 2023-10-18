const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const classController = require('../controlparts/class-controllers')

const router = express.Router();


router.get('/', authenticateMiddleware, classController.getPackage)

module.exports = router;