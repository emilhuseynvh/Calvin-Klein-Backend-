const jwt = require('jsonwebtoken');
const config = require('../config');

const encodePayload = (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

const decodeToken = (token) => {
    let payload = jwt.decode(token, config.jwtSecret);
    if (!payload) return false;

    return payload;
}


module.exports = {
    encodePayload,
    decodeToken
}