const Joi = require("joi");

const reserveClassSchema = Joi.object({
    date: Joi.date().min('now').required(),
    classroomId: Joi.number().required()
});

exports.reserveClassSchema = reserveClassSchema;