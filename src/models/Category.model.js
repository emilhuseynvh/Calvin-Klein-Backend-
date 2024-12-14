const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  images: {
    type: [Schema.Types.ObjectId],
    ref: 'Image',
  }
}, { timestamps: true });

const Category = model("Category", categorySchema);

module.exports = Category;