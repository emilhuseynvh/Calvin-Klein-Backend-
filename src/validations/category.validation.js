const Joi = require("joi");

const create = Joi.object({
    name: Joi.string().required().trim(),
    slug: Joi.string()
        .optional()
        .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    order: Joi.number().default(0).optional(),
    images: Joi.array().items(Joi.string()).optional(),
    parentId: Joi.string().alphanum().optional(),
});

const update = create.concat(
    Joi.object({
        name: Joi.string().optional().trim(),
    })
);

const categoryValidation = {
    create,
    update,
};

module.exports = categoryValidation;