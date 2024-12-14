const Category = require("../models/Category.model");
const { NotFoundError } = require("../utils/error.util");
const generateSlug = require("../utils/slug.util");

const nestedlist = async () => {
    let list = await Category.find().sort({ order: 1 }).populate('images').lean();

    let result = list.filter(item => !item.parentId)
        .map(item => subCategories(list, item));

    return result;
};

const subCategories = (list, parent) => {
    let children = list.filter(item => item.parentId?.toString() === parent._id.toString())
        .map(item => subCategories(list, item));

    return {
        ...parent,
        children: children.length ? children : undefined
    }
}

const create = async (params) => {
    let checkParentElem = params.parentId ? await Category.findOne({ _id: params.parentId }) : true;
    if (!checkParentElem) throw new NotFoundError("Parent category is not found");

    let category = new Category(params);

    await category.save();
    return category;

};

const update = async (id, params) => {
    if (params.name && !params.slug) {
        params.slug = generateSlug(params.name);
    }
    let category = await Category.findByIdAndUpdate(id, params, { new: true });
    if (!category) throw new NotFoundError();
    return category;
};

const deleteCategory = async (id) => {
    let list = await Category.find().lean();

    let category = await Category.findById(id).lean();

    if (!category) throw new NotFoundError("category is not found");

    category = subCategories(list, category);

    let simplifedList = simplifySubCategory(category);

    simplifedList.push({ ...category, children: undefined });

    let ids = simplifedList.map((item) => item._id);

    await Category.deleteMany({ _id: { $in: ids } });

    return simplifedList;
};

const simplifySubCategory = (category) => {
    let result = (category.children || []).reduce((prev, item) => {
        let children = simplifySubCategory(item);
        delete item.children;

        prev = [...prev, item, ...children];

        return prev;
    }, []);

    return result;
}
const categoryService = {
    nestedlist,
    create,
    update,
    deleteCategory
}

module.exports = categoryService;