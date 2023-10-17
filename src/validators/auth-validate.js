const Joi = require("joi");

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{5,20}$/)
        .trim()
        .required(),
    confirmpassword: Joi.string().valid(Joi.ref("password")).trim().required().strip(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    profileImg: Joi.string().allow('')
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.loginSchema = loginSchema;

const createClassSchema = Joi.object({
    classname: Joi.string().trim().required(),
    time: Joi.string().trim().required(),
    userlimit: Joi.string().trim().required()
});

exports.createClassSchema = createClassSchema;

const createPackageSchema = Joi.object({
    packageName: Joi.string().trim().required(),
    amountTotal: Joi.number().required(),
    pricePerTime: Joi.string().trim().required(),
    totalPrice: Joi.string().trim().required()
})

exports.createPackageSchema = createPackageSchema;