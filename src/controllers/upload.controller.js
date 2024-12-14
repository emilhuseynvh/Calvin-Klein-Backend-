const uploadService = require("../services/upload.service");
const { NotFoundError } = require("../utils/error.util");

const uploadImage = async (req, res, next) => {
    try {
        console.log(req.file);
        
        if (!req.file) throw new NotFoundError('File is required');

        let result = await uploadService.uploadImage(req.file);

        res.status(200).json({ image: result });
    } catch (err) {
        next(err);
    }
}

const uploadController = {
    uploadImage,
}

module.exports = uploadController;