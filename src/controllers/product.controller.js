const productService = require("../services/product.service");

const list = async (req, res, next) => {
  try {
    let result = await productService.list(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await productService.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await productService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const upsertVariants = async (req, res, next) => {
  try {
    let result = await productService.upsertVariant(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const productController = {
  list,
  create,
  update,
  upsertVariants,
  deleteProduct,
};

module.exports = productController;