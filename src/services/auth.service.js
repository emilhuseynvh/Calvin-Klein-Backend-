const User = require("../models/User.model")
const bcrypt = require('bcrypt');
const { DublicateError, NotFoundError } = require("../utils/error.util");
const { encodePayload } = require("../utils/jwt.util");

const register = async (params) => {
    let existUser = await User.find({
        $or: [
            {
                username: params.username
            },
            {
                email: params.email
            },
        ]
    })

    if (!existUser) throw new DublicateError('email or username is exists');


    let user = new User({ ...params, password: hashedPassword });

    await user.save();

    return user;
}

const login = async (params) => {
    let user = await User.findOne({ username: params.username });
    if (!user || !user._id) throw new NotFoundError('Username or email is wrong');

    let checkPassword = await bcrypt.compare(params.password, user.password);

    if (!checkPassword) throw new NotFoundError('Username or email is wrong');

    let token = encodePayload({ userId: user._id });

    return {
        token,
        user
    }
}

const authService = {
    register,
    login
};

module.exports = authService;