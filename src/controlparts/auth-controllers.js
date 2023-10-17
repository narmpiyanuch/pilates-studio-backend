const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const prisma = require('../utils/prisma');
const createError = require('../utils/createError');
const { upload } = require('../utils/cloudinary-service');

const { registerSchema, loginSchema } = require('../validators/auth-validate');


exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body)
        if (error) {
            return next(error);
        }

        let url = ''
        //console.log(req.file)
        if (req.file) {
            url = await upload(req.file.path)
            console.log(url)
        }
        value.password = await bcrypt.hash(value.password, 11);
        // console.log(value.password)
        const user = await prisma.user.create({
            data: {
                ...value,
                role: 'USER',
                profileImg: url
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
    } finally {
        if (req.file.path) {
            fs.unlink(req.file.path);
        }
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

exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user })
}