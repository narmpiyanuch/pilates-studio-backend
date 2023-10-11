const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const createError = require('../utils/createError');

const { registerSchema, loginSchema } = require('../validators/auth-validate');


exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body)
        if (error) {
            return next(error);
        }
        value.password = await bcrypt.hash(value.password, 11);
        console.log(value.password)
        const user = await prisma.user.create({
            data: {
                ...value,
                profileImg: req.body.profileImg,
                role: 'USER'
            }
        })
        const payload = { userId: user.id }
        const accessToken = jwt.sign(payload, process.env.JWT_SECERT_KEY || 'qwertyuiopas', {
            expiresIn: process.env.JWT_EXPIRE
        });
        delete user.password;
        res.status(201).json({ accessToken, user });
    } catch (err) {
        next(err)
    }
};

exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body)
        if (error) {
            return next(error);
        }
        const user = await prisma.user.findFirst({
            where: {
                email: value.email
            }
        });
        if (!user) {
            return next(createError('Not found this user', 400));
        }
        const isPasswordMatch = await bcrypt.compare(value.password, user.password)
        if (!isPasswordMatch) {
            return next(createError('Password invalid', 400))
        }

        const payload = { userId: user.id }
        const accessToken = jwt.sign(payload, process.env.JWT_SECERT_KEY || 'qwertyuiopas', {
            expiresIn: process.env.JWT_EXPIRE
        });
        delete user.password;
        res.status(200).json({ accessToken, user })
    } catch (err) {
        next(err)
    }
};