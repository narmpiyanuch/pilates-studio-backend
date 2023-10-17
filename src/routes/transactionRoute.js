const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const transactionController = require("../controlparts/transaction-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
    "/transaction",
    uploadMiddleware.single("paymentImg"),
    authenticateMiddleware,
    transactionController.createTransaction
);

module.exports = router;
