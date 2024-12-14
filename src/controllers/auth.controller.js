const authService = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        let result = await authService.register(req.body);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        let result = await authService.login(req.body);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const authContoller = {
    register,
    login
};

module.exports = authContoller;