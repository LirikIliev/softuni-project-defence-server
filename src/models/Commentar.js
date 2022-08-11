const { model, Schema, default: mongoose } = require('mongoose');

const commentSchema = new Schema({
    fullName: {
        type: String,
        minlength: 5,
        required: true
    },
    text: {
        type: String,
        minlength: 5,
        required: true,
    },
    _tripId: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
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
});


const Comment = model('Comment', commentSchema);
module.exports = Comment;