const addUpload = require('../../controllers/teacherOptions').addUpload;
const getPPT = require('../../utils/getPPT');
const {ServerError, Success, AuthError} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, name, pdf} = req.body;
        const response = await getPPT(name, pdf);
        if (response.success == false) return res.json({...Success, success: false, message: 'Error generating ppt'});

        const added = await addUpload(userId, response.file, pdf, name, response.questions);

        if (added.success == false) return res.json({...Success, success: false, message: 'Error adding the pdf as ppt'});
        return res.json({...Success, pdf, questions: response.questions, ppt:response.file, id: added.id});
    } catch(err) {
        console.log(err)
        return res.json(ServerError)
    }
}