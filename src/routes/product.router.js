const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const productController = require("../controllers/product.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const productValidation = require("../validations/product.validation");

const productRouter = Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags: [Products]
 *     summary: Get list of products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for product title or description
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter by category IDs
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                 total:
 *                   type: integer
 */
productRouter.get(
    "/",
    validationMiddleware(productValidation.list, "query"),
    productController.list
);

/**
 * @swagger
 * /api/product:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               slug:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
productRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    validationMiddleware(productValidation.create),
    productController.create
);

/**
 * @swagger
 * /api/product/{id}:
 *   post:
 *     tags: [Products]
 *     summary: Update a product
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               slug:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
productRouter.post(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    productController.update
);

/**
 * @swagger
 * /api/product/{id}/variant:
 *   post:
 *     tags: [Products]
 *     summary: Add or update product variant
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
 *             required:
 *               - variants
 *             properties:
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Variant added/updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
productRouter.post(
    "/:id/variant",
    authMiddleware,
    roleMiddleware("admin"),
    validationMiddleware(productValidation.upsertVariant),
    productController.upsertVariants
);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
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
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
productRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), productController.deleteProduct);

module.exports = productRouter;