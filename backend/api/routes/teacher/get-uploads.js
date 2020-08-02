const GetUploads = require('../../controllers/teacherOptions').getUploads;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const uploads = await GetUploads(userId);
        if (uploads.success == false) return res.json({...Success, success: false, message: 'Error getting uploads'});
        return res.json({...Success, uploads: uploads.uploads});
    } catch(err) {
        return res.json(ServerError)
    }
}