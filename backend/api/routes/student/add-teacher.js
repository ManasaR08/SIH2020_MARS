const Search = require('../../controllers/teacherAuth').getTeacher;
const AddToTeacher = require('../../controllers/teacherOptions').addStudent;
const AddToStudent = require('../../controllers/studentOptions').addTeacher;
const {ServerError, Success} = require('../../responses');
0
module.exports = async (req, res) => {
    try {
        const {userId, teacherId} = req.body;
        console.log(teacherId);
        const exists = await Search(teacherId);
        if (exists.success == false || exists.user == null) return res.json({...Success, success: false, message: 'Teacher doesnot exist'});

        const addedToTeacher = await AddToTeacher(userId, teacherId);
        if (addedToTeacher != true)  return res.json({...Success, success: false, message: 'Error adding to teacher'});
        const addedToStudent = await AddToStudent(userId, teacherId);
        if (addedToStudent != true)  return res.json({...Success, success: false, message: 'Error adding to teacher'})

        return res.json({...Success});
    } catch(err) {
        return res.json(ServerError)
    }
}