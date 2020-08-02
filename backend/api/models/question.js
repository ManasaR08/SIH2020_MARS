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
    multipleChoiceQuestions: [{

    }],
    truFalse: [{

    }]
})

module.exports = mongoose.model('Question', Question);