const Search = require('../../controllers/teacherAuth').getTeacher;
const hasAccessToTeacher = require('../../controllers/studentAuth').hasAccessToTeacher;
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, teacherId} = req.body;
        const hasAccess = await hasAccessToTeacher(userId, teacherId);
        if (hasAccess == false) return res.json({...AuthError, success: false, message: 'Add yourself to teacher to view his uploads'});
        
        const teacher = await Search(teacherId);
        if (teacher.success == false || teacher.user == null) return res.json({...Success, success: false, message: 'Error fetching teacher'});
        return res.json({...Success, ...teacher.user});
    } catch(err) {
        return res.json(ServerError)
    }
}