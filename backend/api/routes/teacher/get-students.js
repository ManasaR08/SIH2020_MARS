const GetStudents = require('../../controllers/teacherOptions').viewAllStudents;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const students = await GetStudents(userId);
        if (students.success == false) return res.json({...Success, success: false, message: 'Error getting students'});
        return res.json({...Success, students: students.students});
    } catch(err) {
        return res.json(ServerError)
    }
}