const mongoose = require('mongoose');

const Question = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now()},
    shortAnswer: [{
        Question: {type: String},
        Answer: {type: String}
    }],
    recall: [{
        Question: {type: String},
        Answer: {type: String},
        originalSentence: {type: String}        
    }],
    mcq: [{
        Question: {type: String},
        Answer: {type: String},
        originalSentence: {type: String},
        Options: [{type: String}],
    }],
    trueFalse: [{
        question: {type: String},
        answer: {type: String},
        correctSent: {type: String},
    }]
})

module.exports = mongoose.model('Question', Question);