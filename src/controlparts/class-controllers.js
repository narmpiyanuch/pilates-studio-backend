const cron = require('node-cron')
const prisma = require('../utils/prisma');
const createError = require('../utils/createError');
const { createClassSchema, createPackageSchema } = require('../validators/auth-validate');

//const { reserveClassSchema } = require('../validators/reserve-validate');

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
        res.status(200).json({ packages })
    } catch (err) {
        next(err)
    }
};

exports.getClassroom = async (req, res, next) => {
    try {
        const classrooms = await prisma.classroom.findMany({})
        res.status(200).json({ classrooms })
    } catch (err) {
        next(err)
    }
}

exports.reserveClass = async (req, res, next) => {
    try {
        const { date, classroomId } = req.body
        const reserved = await prisma.reservation.create({
            data: {
                date: new Date(date),
                classroomId: +classroomId,
                userId: req.user.id
            }
        })
        const foundSession = await prisma.session.findFirst({
            where: {
                userId: reserved.userId
            }
        })
        let session
        if (foundSession) {
            session = await prisma.session.update({
                where: {
                    id: foundSession.id
                },
                data: {
                    amount: foundSession.amount - 1
                }
            })
        }
        res.status(201).json({ reserved })
    } catch (err) {
        next(err)
    }
};

exports.getReserveList = async (req, res, next) => {
    try {
        const reservelists = await prisma.reservation.findMany({
            where: {
                AND: [
                    { userId: req.user.id }, {
                        date: {
                            gte: new Date()
                        }
                    }
                ]
            },
            select: {
                id: true,
                date: true,
                user: {
                    select: {
                        firstName: true,
                    }
                },
                classroom: {
                    select: {
                        classname: true
                    }
                }
            }
        });

        res.status(200).json({ reservelists })
    } catch (err) {
        nect(err)
    }
};

exports.cancelClass = async (req, res, next) => {
    try {
        // add validate Joi
        const { reserveId } = req.params;
        const cancel = await prisma.reservation.delete({
            where: {
                id: +reserveId
            }
        })
        const foundSession = await prisma.session.findFirst({
            where: {
                userId: cancel.userId
            }
        })
        let session
        if (foundSession) {
            session = await prisma.session.update({
                where: {
                    id: foundSession.id
                },
                data: {
                    amount: foundSession.amount + 1
                }
            })
        };
        res.status(204).json({ message: "Already cancel!", session })
    } catch (err) {
        console.log(err)
    }
};

exports.getAllReserve = async (req, res, next) => {
    try {
        const allReserve = await prisma.reservation.findMany({
            select: {
                id: true,
                date: true,
                user: {
                    select: {
                        firstName: true,
                    }
                },
                classroom: {
                    select: {
                        classname: true
                    }
                }
            }
        });
        res.status(200).json({ allReserve })
    } catch (err) {
        console.log(err)
    }
}