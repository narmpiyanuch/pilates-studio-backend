const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const authAdmin = require('../middlewares/authadmin');
const postController = require("../controlparts/post-controllers");
const transactionController = require("../controlparts/transaction-controller");

const router = express.Router();

router.post(
    "/createclass",
    authenticateMiddleware,
    authAdmin,
    postController.createClassName
);
router.post(
    "/createpackage",
    authenticateMiddleware,
    authAdmin,
    postController.createPackage
);

router.get(
    "/transaction",
    authenticateMiddleware,
    authAdmin,
    transactionController.getTransaction
);

router.put(
    "/session/:listId",
    authenticateMiddleware,
    authAdmin,
    transactionController.updateSession
);

module.exports = router;
