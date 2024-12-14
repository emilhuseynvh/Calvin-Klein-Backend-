const Joi = require("joi");


const imageValidation = Joi.object({
    url: Joi.string().required().trim()
})

module.exports = imageValidation;