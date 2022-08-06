const { model, Schema } = require('mongoose');

const validateEmail = function (email) {
    let regexp = /^\w+@\w+\.[a-zA-z]+$/g;
    return regexp.test(email)
};

const userSchema = new Schema({
    fullName: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        min: [10, "Email address must be at least 10 characters long!"],
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+@\w+\.[a-zA-z]+$/, 'Please fill a valid email address'],
        required: true,
    },
    password: {
        type: String,
        min: [3, "Password must be at least 3 characters long!"],
        required: true,
    },
})

const User = model("User", userSchema);
module.exports = User;