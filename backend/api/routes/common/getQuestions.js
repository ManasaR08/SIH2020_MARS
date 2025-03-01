const getQuestion = require('../../controllers/commons').getQuestions;
const {ServerError, Success} = require('../../responses');

module.exports =async (req ,res) => {
    try {
        const {userId, questionId} = req.body;
        const questions = await getQuestion(questionId);
        console.log(questions);
        if (questions.success == false) return res.json({...Success, success: false});
        return res.json({...Success, ...questions});
    }catch(err) {
        return res.json(ServerError)
    }
}