const Trip = require('../models/Trip.js');

async function getAll() {
    return Trip.find({});
};

async function getSortedByDate() {
    return Trip.find({}).sort({ data: 'descending' }).limit(3);
};

async function getAllFromSpecificOwner(ownerId) {
    return Trip.find({ _ownerId: ownerId });
};

async function getOne(id) {
    return await Trip.findById(id);
}

async function create(data) {
    return await Trip.create(data);
};

async function editOne(id, data) {
    return await Trip.findByIdAndUpdate(id, data)
};

async function deleteOne(id) {
    return await Trip.findByIdAndDelete(id);
};

async function likeOne(id, userId) {
    return await Trip.findByIdAndUpdate(id, { $push: { likes: userId } })
};
async function dislikeOne(id, userId) {
    return await Trip.findByIdAndUpdate(id, { $pull: { likes: userId } })
};

module.exports = {
    getAll,
    getSortedByDate,
    getAllFromSpecificOwner,
    create,
    getOne,
    editOne,
    deleteOne,
    likeOne,
    dislikeOne,
};