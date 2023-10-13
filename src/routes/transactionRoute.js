const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const transactionController = require('../controlparts/transaction-controller');

const router = express.Router();

router.post('/transaction', authenticateMiddleware.authUser, transactionController.createTransaction)

module.exports = router;