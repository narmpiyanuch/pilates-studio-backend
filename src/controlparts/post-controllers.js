const prisma = require('../utils/prisma');
const createError = require('../utils/createError');
const { createClassSchema, createPackageSchema } = require('../validators/auth-validate')

exports.createClassName = async (req, res, next) => {
    try {
        const { value, error } = createClassSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const classroom = await prisma.classroom.create({
            data: value
        });
        res.status(201).json({ message: 'Classroom is created', classroom })
    } catch (err) {
        next(err);
    }
};

exports.createPackage = async (req, res, next) => {
    try {
        const { value, error } = createPackageSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const package = await prisma.package.create({
            data: value
        });
        res.status(201).json({ message: 'Package is created', package })
    } catch (err) {
        next(err)
    }
};

exports.getPackage = async (req, res, next) => {
    try {
        const packages = await prisma.package.findMany({})
        // console.log(packages)
        res.status(200).json({ packages })
    } catch (err) {
        next(err)
    }
};

