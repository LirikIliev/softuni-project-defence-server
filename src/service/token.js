const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { secret, blackList } = require('../constants.js');

//  create token 
exports.token = async (email, password) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw { message: 'Wrong username or password, please try again!' }
    };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw { message: 'Wrong username or password!!! Please try later!' };
    };

    let token = {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
    };

    let result = new Promise((resolve, reject) => {
        jwt.sign(token, secret, { expiresIn: "2d" }, (err, token) => {
            if (err) {
                return reject(err);
            };
            resolve(token);
        });
    });
    return result;
}

// verify access token!
exports.verifyToken = (token) => {
    if (blackList.has(token)) {
        throw { message: 'Token is black listed!' };
    };
    return jwt.verify(token, secret);
};