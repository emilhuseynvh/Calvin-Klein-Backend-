const userService = require("../services/user.service");

const update = async (req, res, next) => {
    try {
        let user = await userService.update(req.user._id, req.body);

        res.status(200).json({ message: "User updated succesfully", user });
    } catch (err) {
        next(err);
    }
}

const userController = {
    update
}

module.exports = userController;