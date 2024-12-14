const { Router } = require('express');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const { ValidationError } = require('../utils/error.util');
const uploadController = require('../controllers/upload.controller');
const roleMiddleware = require('../middlewares/role.middleware');

const uploadRouter = Router();

const uploadPath = path.join(__dirname, './../../upload');
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        let extension = path.extname(file.originalname);
        let filename = `${uuid.v4()}-${Date.now()}${extension}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    let type = file.mimetype;

    if (allowedTypes.includes(type)) cb(null, true);

    else cb(new ValidationError('Image type is wrong'));

}

/**
 * @swagger
 * /api/image:
 *   post:
 *     tags: [Images]
 *     summary: Upload an image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpeg, png, webp, or gif)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 url:
 *                   type: string
 *                 filename:
 *                   type: string
 *       400:
 *         description: Invalid image type
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
uploadRouter.post(
    '/',
    multer({ storage, fileFilter }).single('image'),
    roleMiddleware('admin'),
    uploadController.uploadImage
)

module.exports = uploadRouter;

