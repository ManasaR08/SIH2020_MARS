const GetTeachers = require('../../controllers/teacherOptions').popularTeachers;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const teachers = await GetTeachers(userId);
        if (teachers.success == false) return res.json({...Success, success: false, message: 'Error getting teachers'});
        return res.json({...Success, teachers: teachers.teachers});
    } catch(err) {
        return res.json(ServerError)
    }
}