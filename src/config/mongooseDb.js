const { url } = require('../constants.js');
const mongoose = require('mongoose');

module.exports = mongoose.connect(url);