const Joi = require("joi");

const register = Joi.object({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    username: Joi.string().required().trim(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{5,}$'))
        .required()
});

const login = Joi.object({
    username: Joi.string().required().trim(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{5,}$'))
        .required()
})

const authValidation = {
    register,
    login
};

module.exports = authValidation;