const axios = require('axios');
const URL = 'http://localhost:8000/search'

module.exports = async (text, type) => {
    try {
        let postResponse = await axios.post(URL, {
            text: text,
            types: type
        });
        postResponse = postResponse.data;
        if (postResponse.result == undefined) return {success: false};
        return {success: true, result: postResponse.result}
    } catch (err) {
        return {success: false, error: err};
    }
}