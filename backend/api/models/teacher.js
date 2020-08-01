const mongoose = require('mongoose');

const teacher = new mongoose.Schema({
    name: {type: String},
    phone: {type: Number},
    otp: {
        otp: {type: Number},
        expiresOn: {type: Number}
    },
    password: {type: String},
    hasPassword: {type: String},
    uploads: [{type: mongoose.Schema.Types.ObjectID, ref: 'Upload'}],
    students: [{type: mongoose.Schema.Types.ObjectID, ref: 'Student'}]
});

module.exports = mongoose.model('Teacher', teacher);