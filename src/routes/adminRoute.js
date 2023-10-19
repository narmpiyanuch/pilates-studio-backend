const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const authAdmin = require('../middlewares/authadmin');
const classController = require("../controlparts/class-controllers");
const transactionController = require("../controlparts/transaction-controller");

const router = express.Router();

router.post(
    "/createclass",
    authenticateMiddleware,
    authAdmin,
    classController.createClassName
);
router.post(
    "/createpackage",
    authenticateMiddleware,
    authAdmin,
    classController.createPackage
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

router.get("/reservation",
    authenticateMiddleware,
    authAdmin,
    classController.getAllReserve
);

module.exports = router;
