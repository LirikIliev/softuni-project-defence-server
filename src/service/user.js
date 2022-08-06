const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { saltRounds, blackList } = require('../constants.js');
const { token } = require('./token.js');

exports.createUser = async (data) => {
    const existing = await User.findOne({ email: data.email });

    if (existing) {
        throw { message: "Email is taken!" };
    };

    let cryptPass = await bcrypt.hash(data.password, saltRounds);
    let userData = {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: cryptPass,
    };

    let createdUser = await User.create(userData);
    let accessToken = await token(data.email, data.password);

    const user = {
        email: createdUser.email,
        _id: createdUser._id,
        accessToken,
    };

    return user;
};

exports.getUser = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw { message: "Wrong email or password!" };
    };

    let accessToken = await token(user.email, data.password);
    let userData = {
        fullName: user.fullName,
        email: user.email,
        // if it's necessary 
        // password: user.password,
        _id: user._id,
        accessToken,
    };
    return userData;
};

exports.logout = (token) => {
    blackList.add(token);
}