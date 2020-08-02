const GetSuggestions = require('../../controllers/studentOptions').viewAllSuggestions;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const suggestions = await GetSuggestions(userId);
        if (suggestions.success == false) return res.json({...Success, success: false, message: 'Error getting searches'});
        return res.json({...Success, suggestions: suggestions.suggestions});
    } catch(err) {
        return res.json(ServerError)
    }
}