const Comment = require('../models/Commentar.js');

async function getAll(tripId) {
    return await Comment.find({ _tripId: tripId }).sort({ data: 'descending' });
};

async function create(data) {
    return await Comment.create(data);
};

async function likeOne(id, userId) {
    return await Comment.findByIdAndUpdate(id, { $push: { likes: userId } });
};

async function dislikeOne(id, userId) {
    return await Comment.findByIdAndUpdate(id, { $pull: { likes: userId } });
};

async function deleteOne(commentId) {
    return await Comment.findByIdAndDelete(commentId);
};

module.exports = {
    create,
    getAll,
    deleteOne,
    likeOne,
    dislikeOne,
};