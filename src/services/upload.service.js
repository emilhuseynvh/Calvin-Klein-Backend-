import ImageModel from '../models/Image.model'

const uploadImage = async (file) => {
    let filename = file.filename;

    let image = new ImageModel({
        url: `/upload/${filename}`
    });

    await image.save();

    return image;
}

const uploadService = {
    uploadImage,
}

module.exports = uploadService;