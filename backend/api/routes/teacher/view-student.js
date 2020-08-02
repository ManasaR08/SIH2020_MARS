const Search = require('../../controllers/studentAuth').getStudent;
const hasAccessToStudent = require('../../controllers/teacherAuth').hasAccessToStudent;
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, studentId} = req.body;
        const hasAccess = await hasAccessToStudent(userId, studentId);
        if (hasAccess == false) return res.json({...AuthError, success: false, message: 'Student is not subscribed to you'});
        
        const teacher = await Search(studentId);
        return res.json({...Success, ...teacher});
    } catch(err) {
        return res.json(ServerError)
    }
}