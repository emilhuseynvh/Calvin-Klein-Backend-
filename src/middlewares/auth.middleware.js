const User = require("../models/User.model");
const { UnauthorizedError } = require("../utils/error.util");
const { decodeToken } = require("../utils/jwt.util");

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) return next(new UnauthorizedError('Unauthorized'));

    let token = authorization.split(' ')[1];
    
    let payload = decodeToken(token);

    if (!payload?.userId) return next(new UnauthorizedError('Unauthorized'));

    let user = await User.findById(payload.userId);

    

    req.user = user;
    next();
}

module.exports = authMiddleware;