const fs = require('fs/promises');
const prisma = require('../utils/prisma');
const createError = require('../utils/createError');
const { upload } = require('../utils/cloudinary-service');


exports.createTransaction = async (req, res, next) => {
    try {
        const { packageId } = req.body;
        if (!packageId || packageId.trim() && !req.file) {
            return next(createError('message or image is required', 400));
        }
        let url = ''
        if (req.file) {
            console.log('kao if')
            console.log(req.file.path)
            url = await upload(req.file.path)
        }

        const package = await prisma.package.findFirst({
            where: {
                id: +packageId
            }
        });

        const transaction = await prisma.transaction.create({
            data: {
                packageId: +packageId,
                userId: req.user.id,
                amount: package.amountTotal,
                price: package.totalPrice,
                paymentImg: url
            }
        });

        const session = await prisma.session.create({
            data: {
                amount: transaction.amount,
                userId: transaction.userId,
                transactionId: transaction.id
            }
        });
        res.status(201).json({ message: "Successful", transaction, session })
    } catch (err) {
        next(err)
    } finally {
        if (req.file.path) {
            fs.unlink(req.file.path);
        }
    }
};