const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const uploadRouter = require("./uplad.route");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const productRouter = require("./product.router");

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/image', authMiddleware, uploadRouter);
router.use('/product', productRouter);

module.exports = router;