const { AppError } = require("../utils/error.util");

const roleMiddleware = (...roles) => {
    
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {            
            next(new AppError('Forbidden', 403));
        }

        next();
    }
}

module.exports = roleMiddleware;