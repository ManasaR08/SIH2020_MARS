const addSuggestions = require('../../controllers/studentOptions').addSuggestion;
const hasAccessToStudent = require('../../controllers/teacherAuth').hasAccessToStudent;
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, studentId, text} = req.body;
        const hasAccess = await hasAccessToStudent(userId, studentId);
        if (hasAccess == false) return res.json({...AuthError, success: false, message: 'Student is not subscribed to you'});
        await addSuggestions(userId, studentId, text);
        return res.json({...Success});
    } catch(err) {
        return res.json(ServerError)
    }
}