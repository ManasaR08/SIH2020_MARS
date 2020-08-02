const Search = require('../../controllers/teacherAuth').findByName;
const {ServerError, Success} = require('../../responses');

module.exports = async (req, res) => {
    try {
        const {name} = req.body;
        const searched = await Search(name);
        if (searched.success == false) return res.json({...Success, success: false, message: 'Error finding users'});
        return res.json({...Success, users: searched.users});
    } catch(err) {
        return res.json(ServerError)
    }
}