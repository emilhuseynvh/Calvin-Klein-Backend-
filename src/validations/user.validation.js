const Joi = require("joi");

const update = Joi.object({
    firstName: Joi.string().optional().trim(),
    lastName: Joi.string().optional().trim(),
    email: Joi.string().email().optional().trim(),
    username: Joi.string().optional().trim(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{5,}$'))
});

const userValidation = {
    update,
}

module.exports = userValidation;