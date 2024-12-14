const User = require("../models/User.model");

const update = async (id, params) => {
    let result = await User.findByIdAndUpdate(id, params, { new: true });

    return result;
}

const userService = {
    update
}

module.exports = userService;