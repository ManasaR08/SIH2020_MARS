const AddSearch = require('../../controllers/studentOptions').addSearch;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, text, type} = req.body;
        let result = [{text: 'Lorem ipsum dolor sit, amet consectetu elit', image:'assets/images/image.png', voice: ''},{text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit', image:'assets/images/image.png', voice: ''}];
        const addedToStudent = await AddSearch(userId, text, result, type);
        if (addedToStudent.success != true)  return res.json({...Success, success: false, message: 'Error adding to teacher'})
        return res.json({...Success, id: addedToStudent.id, result: result});
    } catch(err) {
        console.log(err);
        return res.json(ServerError)
    }
}