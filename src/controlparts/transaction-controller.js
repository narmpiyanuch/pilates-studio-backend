const fs = require("fs/promises");
const prisma = require("../utils/prisma");
const createError = require("../utils/createError");
const { upload } = require("../utils/cloudinary-service");

exports.createTransaction = async (req, res, next) => {
  try {
    //console.log('first')
    const { packageId } = req.body;
    //console.log(packageId)
    if (!packageId || (packageId.trim() && !req.file)) {
      return next(createError("message or image is required", 400));
    }
    let url = "";
    if (req.file) {
      console.log(req.file.path);
      url = await upload(req.file.path);
    }

    const package = await prisma.package.findFirst({
      where: {
        id: +packageId,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        packageId: +packageId,
        userId: req.user.id,
        amount: package.amountTotal,
        price: package.totalPrice,
        paymentImg: url,
      },
    });

    res.status(201).json({ message: "Successful", transaction });
  } catch (err) {
    next(err);
  } finally {
    if (req.file.path) {
      fs.unlink(req.file.path);
    }
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        price: true,
        paymentImg: true,
        status: true,
        user: {
          select: {
            firstName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const transaction = await prisma.transaction.update({
      where: {
        id: +listId,
      },
      data: {
        status: "APPROVED",
      },
    });
    const foundSession = await prisma.session.findFirst({
      where: {
        userId: transaction.userId,
      },
    });
    let session;
    if (foundSession) {
      session = await prisma.session.update({
        where: {
          id: foundSession.id,
        },
        data: {
          amount: foundSession.amount + transaction.amount,
        },
      });
    } else
      session = await prisma.session.create({
        data: {
          amount: transaction.amount,
          userId: transaction.userId,
        },
      });
    res.status(201).json({ message: "Successful", transaction, session });
  } catch (err) {
    next(err);
  }
};
