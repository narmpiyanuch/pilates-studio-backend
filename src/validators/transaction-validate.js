const Joi = require('joi');

const transactionSchema = Joi.object({
    paymentImg: Joi.string().allow(''),
    packageId: Joi.number().required()
});

exports.transactionSchema = transactionSchema;