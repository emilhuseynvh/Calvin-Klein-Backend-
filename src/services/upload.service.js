const Image = require("../models/image.model");

const uploadImage = async (file) => {
    let filename = file.filename;

    let image = new Image({
        url: `/upload/${filename}`
    });

    await image.save();

    return image;
}

const uploadService = {
    uploadImage,
}

module.exports = uploadService;