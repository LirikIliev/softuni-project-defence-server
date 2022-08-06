const { model, Schema, default: mongoose } = require('mongoose');
const validateImage = function (image) {
    let regexp = /^https:\/\/|http:\/\//g;
    return regexp.test(image)
};

const TripSchema = new Schema({
    author: {
        type: String,
        required: true,
        minlength: 5
    },
    country: {
        type: String,
        required: true,
        minlength: 4,
    },
    destination: {
        type: String,
        required: true,
        minlength: 5
    },
    imageUrl: {
        type: String,
        validate: [validateImage, 'Please put correct img url address!!!'],
        match: [/^https:\/\/|http:\/\//, 'Please put correct img url address!!!'],
    },
    description: {
        type: String,
        minlength: 20,
        required: true,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    data: {
        type: Date,
        default: Date.now,
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

const Trip = model('Trip', TripSchema);
module.exports = Trip;