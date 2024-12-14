const Joi = require("joi");
const pageValidation = require("./pagination.validation");

const list = Joi.object({
    categories: Joi.string()
        .custom((value, helpers) => {
            let check = /^([0-9a-fA-F]{24})(,\s*[0-9a-fA-F]{24})*$/.test(value);
            if (!check) return helpers.message("Category ids are not valid");

            let categories = value
                ?.split(",")
                .map((item) => item?.trim())
                .filter((item) => item);
            return categories;
        })
        .message("Categories ids are not valid"),
    // minPrice: Joi.number().optional().min(1),
    // maxPrice: Joi.number().optional().min(1),
    "specs.color": Joi.string().optional(),
    price: Joi.string().optional(),
    size: Joi.string().optional(),
    search: Joi.string().optional(),
}).concat(pageValidation);

const create = Joi.object({
    title: Joi.string().min(5).required().trim(),
    slug: Joi.string()
        .optional()
        .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: Joi.string().optional(),
    categories: Joi.array().items(Joi.string()).default([]),
    specs: Joi.array()
        .items(
            Joi.object({
                key: Joi.string().trim().required(),
                name: Joi.string().trim().required(),
                values: Joi.array().items(
                    Joi.object({
                        key: Joi.string().required().trim(),
                        value: Joi.string().required().trim(),
                    })
                ),
            })
        )
        .default([]),
});

const upsertVariant = Joi.object({
    specs: Joi.object()
        .pattern(Joi.string().required(), Joi.string().required())
        .required()
        .default({}),
    stock: Joi.number().optional().default(0),
    slug: Joi.string()
        .optional()
        .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    price: Joi.number().min(1).required(),
    discount: Joi.number().optional().min(0).default(0),
    discountType: Joi.string().valid("percentage", "value").default("percentage"),
    images: Joi.array().items(Joi.string()).default([]),
});

const productValidation = {
    list,
    create,
    upsertVariant,
};

module.exports = productValidation;