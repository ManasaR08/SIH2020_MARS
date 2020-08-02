const Question = require('../models/question');

module.exports = {
    getQuestions: async (id) => {
        try {
            const questions = await Question.findOne({_id: id}).lean();
            if (questions == null) return {success: false};
            return {success: true, ...questions};
        } catch(err) {
            return {success: false, error: err};
        }
    }
}