const mongoose = require('mongoose');

const Search = new mongoose.Schema({
    search: {type: String},
    result: [{image: {type: String}, text: {type: String}, voice: {type: String}}],
    createdAt: {type: Date, default: Date.now()},
    type: {type: String, enum: ['answer', 'visualise']}
})

module.exports = mongoose.model('Search', Search);