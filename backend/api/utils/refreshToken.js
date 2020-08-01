const logger = require('../../config/winston');

const {generate} = require('./jwt');

/*** 
 * @desc Generate access token
 ***/
module.exports = async (access, id) => {
    try {        
        let access_token = await generate('access',{ id, access, type: 'access_token', expires: Date.now() + 300*60*1000 });
        let refresh_token = await generate('refresh',{ id, access, type: 'refresh_token', expires: Date.now() + 30*300*60*1000 });

        return {
            success: true,
            access_token: access_token.token,
            refresh_token:refresh_token.token,
        };
    } catch (err) {
        logger.error({ error: err, message: `An error occured` });
        return {success: false};
    }
}
