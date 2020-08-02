const GetTeachers = require('../../controllers/studentOptions').viewAllTeachers;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const teachers = await GetTeachers(userId);
        if (teachers.success == false) return res.json({...Success, success: false, message: 'Error fetching your teachers'});
        return res.json({...Success, teachers: teachers.teachers});
    } catch(err) {
        return res.json(ServerError)
    }
}