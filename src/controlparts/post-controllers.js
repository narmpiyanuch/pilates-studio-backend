const prisma = require('../utils/prisma');
const createError = require('../utils/createError');
const { createClassSchema } = require('../validators/auth-validate')

exports.createClassName = async (req, res, next) => {
    try {
        console.log('here')
        const { value, error } = createClassSchema.validate(req.body);
        const time_range = value.time;
        console.log(time_range)
        console.log(error)
        console.log(value)
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