const AddSearch = require('../../controllers/studentOptions').addSearch;
const {ServerError, Success} = require('../../responses');
const getSearch = require('../../utils/getSearch');

module.exports = async (req, res) => {
    try {
        const {userId, text, type} = req.body;
        const result = await getSearch(text, type);
        if (result.success == false) return res.json({...Success, success: false});
        const addedToStudent = await AddSearch(userId, text, result.result, type);
        if (addedToStudent.success != true)  return res.json({...Success, success: false, message: 'Error adding to teacher'})
        return res.json({...Success, id: addedToStudent.id, result: result});
    } catch(err) {
        console.log(err);
        return res.json(ServerError)
    }
}