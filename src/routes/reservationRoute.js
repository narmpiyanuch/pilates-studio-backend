const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const classController = require("../controlparts/class-controllers");

const router = express.Router();

router.get('/classroom', authenticateMiddleware, classController.getClassroom)
router.delete('/cancel/:reserveId', authenticateMiddleware, classController.cancelClass)


module.exports = router;