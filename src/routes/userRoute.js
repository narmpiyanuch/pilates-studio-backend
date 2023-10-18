const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const userController = require('../controlparts/user-controllers');
const classController = require('../controlparts/class-controllers');


const router = express.Router();

router.get('/profile', authenticateMiddleware, userController.getProfile)
router.post('/reserve', authenticateMiddleware, classController.reserveClass)
router.get('/reservelist', authenticateMiddleware, classController.getReserveList)



module.exports = router;