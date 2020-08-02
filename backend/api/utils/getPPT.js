const axios = require('axios');

module.exports = async (file) => {
    try {
        const postResponse = await axios.post(URL, {
            filepath: file
        });
        if (postResponse.filepath == undefined) return {success: false};
        return {success: true, file: postResponse.filepath}
    } catch (err) {
        return {success: false, error: err};
    }
}