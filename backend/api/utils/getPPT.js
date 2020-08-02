const axios = require('axios');
const URL = 'http://localhost:8000/pdfpptgen'

module.exports = async (name, file) => {
    try {
        let postResponse = await axios.post(URL, {
            filepath: file,
            name: name
        });
        postResponse = postResponse.data;
        if (postResponse.filepath == undefined) return {success: false};
        return {success: true, file: postResponse.filepath, questions: postResponse.questions}
    } catch (err) {
        return {success: false, error: err};
    }
}