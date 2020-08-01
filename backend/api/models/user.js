const mongoose = require('mongoose');

const student = new mongoose.Schema({
    name: {type: String},
    phone: {type: Number},
    otp: {
        otp: {type: Number},
        expiresOn: {type: Number}
    },
    password: {type: String},
    hasPassword: {type: String},
    teachers: [{type: mongoose.Schema.Types.ObjectID, ref: 'Teacher'}],
    searches: [{type: mongoose.Schema.Types.ObjectID, ref: 'Search'}],
    suggestions: [{search: {type: String}, by: {type: mongoose.Schema.Types.ObjectID, ref: 'Teacher'}}]
});

module.exports = mongoose.model('Student', student);