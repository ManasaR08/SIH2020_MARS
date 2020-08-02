const addUpload = require('../../controllers/teacherOptions').addUpload;
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, name, pdf} = req.body;
        let ppt = '';
        const added = await addUpload(userId, ppt, pdf, name);

        if (added.success == false) return res.json({...AuthError, success: false, message: 'Error adding the pdf as ppt'});
        return res.json({...Success, pdf, ppt, id: added.id});
    } catch(err) {
        return res.json(ServerError)
    }
}