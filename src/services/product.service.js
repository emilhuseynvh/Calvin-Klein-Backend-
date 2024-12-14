const Product = require("../models/Product.model");
const { NotFoundError, ValidationError } = require("../utils/error.util");
const generateSlug = require("../utils/slug.util");

const list = async (filter = {}) => {
  let query = Product.find();

  let where = {};

  if (filter.categories) {
    where.categories = {
      $in: filter.categories,
    };
  }

  if (filter.search) {
    where.$and = [
      {
        $or: [
          {
            title: { $regex: filter.search, $options: "i" },
          },
          {
            description: { $regex: filter.search, $options: "i" },
          },
        ],
      },
    ];
  }

  for (let [key, value] of Object.entries(filter)) {
    if (["categories", "page", "limit", "search"].includes(key)) continue;
    if (value[0] === "[") {
      let [min, max] = value
        .slice(1, -1)
        .split(",")
        .map((item) => +item.trim());

      where[`variants.${key}`] = {
        $lte: max,
        $gte: min,
      };
    } else if (value[0] === "<") {
      where[`variants.${key}`] = {
        $lte: value.slice(1),
      };
    } else if (value[0] === ">") {
      where[`variants.${key}`] = {
        $gte: value.slice(1),
      };
    } else if (value.includes(",")) {
      where[`variants.${key}`] = {
        $in: value.split(",").map((item) => item.trim()),
      };
    } else {
      where[`variants.${key}`] = value;
    }
  }

  query.where(where);
  query.limit(filter.limit || 10);
  query.skip(filter.limit * (filter.page - 1));

  query.populate("categories");
  query.populate("variants.images");
  let products = await query;

  const total = await Product.countDocuments(where);
  return {
    products,
    total,
  };
};

const create = async (params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }
  let product = new Product(params);
  await product.save();

  return product;
};

const upsertVariant = async (id, params) => {
  const product = await Product.findById(id);

  if (!product) throw new NotFoundError("Product is not found");

  for (let [key, value] of Object.entries(params.specs)) {
    let productSpec = product.specs.find((spec) => spec.key === key);
    if (!productSpec)
      throw new ValidationError(`${key} speciality is not exists in product`);

    let productSpecItem = productSpec.values.find((item) => item.key === value);
    if (!productSpecItem)
      throw new ValidationError(`${value} is not found in ${key} speciality`);
  }

  product.variants = product.variants || [];
  const { variants } = product;

  const variant = variants.find((variant) => {
    let checkSpec = Object.entries(Object.fromEntries(variant.specs)).every(
      ([key, value]) => {
        return params.specs[key] === value;
      }
    );

    return checkSpec;
  });

  params.slug =
    params.slug ||
    variant?.slug ||
    generateSlug(`${Object.values(params.specs).join("-")}`);

  if (variant) {
    for (let [key, value] of Object.entries(params)) {
      variant[key] = value;
    }
  } else {
    product.variants.push(params);
  }

  await product.save();

  return product;
};

const update = async (id, params) => {
  let product = await Product.findByIdAndUpdate(id, params, { new: true });
  if (!product) throw new NotFoundError("Product is not found");

  return product;
};

const deleteProduct = async (id) => {
  let result = await Product.deleteOne({ _id: id });
  return result.acknowledged;
};

const productService = {
  list,
  create,
  update,
  upsertVariant,
  deleteProduct,
};

module.exports = productService;