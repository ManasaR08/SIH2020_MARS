const removeUpload = require('../../controllers/teacherOptions').deleteUpload;
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, uploadId} = req.body;
        const removed = await removeUpload(userId, uploadId);
        if (removed == false) return res.json({...AuthError, success: false, message: 'Error adding the pdf as ppt'});
        return res.json(Success);
    } catch(err) {
        return res.json(ServerError)
    }
}