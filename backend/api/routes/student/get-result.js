const GetResult = require('../../controllers/studentOptions').getResult;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId, searchId} = req.body;
        const result = await GetResult(searchId);
        if (result.success == false) return res.json({...Success, success: false, message: 'Error getting result'});
        return res.json({...Success, ...result});
    } catch(err) {
        return res.json(ServerError)
    }
}