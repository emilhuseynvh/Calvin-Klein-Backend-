const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const categoryController = require("../controllers/category.controller");
const validataionMiddleware = require("../middlewares/validation.middleware");
const categoryValidation = require("../validations/category.validation");

const categoryRouter = Router();

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags: [Categories]
 *     summary: Get nested list of categories
 *     responses:
 *       200:
 *         description: List of categories in nested structure
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   parent:
 *                     type: string
 *                   children:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Category'
 */
categoryRouter.get('/', categoryController.nestedList);

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               parent:
 *                 type: string
 *                 description: Parent category ID
 *     responses:
 *       200:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
categoryRouter.post('/',
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.create);

/**
 * @swagger
 * /api/category/{id}:
 *   post:
 *     tags: [Categories]
 *     summary: Update a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent:
 *                 type: string
 *                 description: Parent category ID
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
categoryRouter.post('/:id',
    validataionMiddleware(categoryValidation.update),
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.update);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
categoryRouter.delete('/:id',
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.deleteCategory);

module.exports = categoryRouter;