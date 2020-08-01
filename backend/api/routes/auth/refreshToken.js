const refresh = require('../../utils/refreshToken');
const { AuthError } = require('../../responses');
const { verify } = require('../../utils/jwt');

const logger = require('../../../config/winston');

/**
 * @desc Express refresh token endpoint
 */
module.exports = async (req, res) => {
    if (req.cookies['ParaDemic'] == undefined) return res.json(AuthError);
    try {
        let cookie = req.cookies['ParaDemic'];
        const data = await verify(cookie);
        if (!data.success) {
            res.cookie('ParaDemic', '', {expires: 0});
            return res.json(AuthError);
        }
        if (data.type != 'refresh_token' || data.expires < Date.now()) return res.json(AuthError);
        const newTokens = await refresh(data.access, data.id);


        if (!newTokens.success) return res.json(AuthError);
        else {
            res.cookie('ParaDemic', newTokens.refresh_token);
            res.json({
                success: true,
                access_token: newTokens.access_token
            });
        }
    } catch (err) {
        logger.error({error: err, message: "An error occured"});
        return res.json(AuthError);
    }
}