const { Router } = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validataionMiddleware = require("../middlewares/validation.middleware");
const userValidation = require("../validations/user.validation");

const userRouter = Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [Users]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 */
userRouter.post('/',
    validataionMiddleware(userValidation.update),
    authMiddleware,
    userController.update);

module.exports = userRouter;