const GetSearches = require('../../controllers/studentOptions').viewAllSearches;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {userId} = req.body;
        const searches = await GetSearches(userId);
        if (searches.success == false) return res.json({...Success, success: false, message: 'Error getting searches'});
        return res.json({...Success, searches: searches.searches});
    } catch(err) {
        return res.json(ServerError)
    }
}