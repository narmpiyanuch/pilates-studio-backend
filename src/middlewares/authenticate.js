const { createError } = require('../utils/createError');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

exports.authCreateClass = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next(createError('unauthenticated', 401));
        }
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECERT_KEY || 'zxcvbnmlk');
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        console.log(user)
        if (!user) {
            return next(createError('unauthenticated', 401));
        }
        if (user.role == 'USER') {
            console.log('me')
            return next(createError('unauthenticated', 401));
        }
        console.log('here')
        delete user.password;
        req.user = user;
        console.log(req.user)
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            err.statusCode(401);
        }
        next(err);
    }
};