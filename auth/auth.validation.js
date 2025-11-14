const Joi = require("joi");

exports.registerValidation = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
});

exports.loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
});