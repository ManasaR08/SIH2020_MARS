const AddSearch = require('../../controllers/studentOptions').addSearch;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, text, type} = req.body;
        let result = [];
        const addedToStudent = await AddSearch(userId, text, result, type);
        if (addedToStudent.success != true)  return res.json({...Success, success: false, message: 'Error adding to teacher'})
        return res.json({...Success, id: addedToStudent.id, result: result});
    } catch(err) {
        return res.json(ServerError)
    }
}