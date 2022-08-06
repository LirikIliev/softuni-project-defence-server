const Furniture = require('../models/Furniture.js');

async function getAll() {
    return Furniture.find({});
};

async function getSortedByDate() {
    return Furniture.find({}).sort({ data: 'descending' }).limit(3);
};

async function getAllFromSpecificOwner(ownerId) {
    return Furniture.find({ _ownerId: ownerId });
};

async function getOne(id) {
    return await Furniture.findById(id);
}

async function create(data) {
    return await Furniture.create(data);
};

async function editOne(id, data) {
    return await Furniture.findByIdAndUpdate(id, data)
};

async function deleteOne(id) {
    return await Furniture.findByIdAndDelete(id);
};

async function likeOne(id, userId) {
    return await Furniture.findByIdAndUpdate(id, { $push: { likes: userId } })
};
async function dislikeOne(id, userId) {
    return await Furniture.findByIdAndUpdate(id, { $pull: { likes: userId } })
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