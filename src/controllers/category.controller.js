const categoryService = require("../services/category.service")

const nestedList = async (req, res, next) => {
    try {
        let category = await categoryService.nestedlist();

        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}


const lists = (req, res, next) => { }

const create = async (req, res, next) => {
    try {
        let category = await categoryService.create(req.body);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        let result = await categoryService.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);

        res.status(200).json({ message: "Category deleted succesfully" });

    } catch (err) {
        next(err);
    }
}

const categoryController = {
    nestedList,
    lists,
    create,
    update,
    deleteCategory
}

module.exports = categoryController