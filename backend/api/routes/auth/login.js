const TeacherLogin = require('../../controllers/teacherAuth').loginPassword;
const StudentLogin = require('../../controllers/studentAuth').loginPassword;
const {ServerError, Success} = require('../../responses');
const {generate} = require('../../utils/jwt');
module.exports = async (req, res) => {
    try {
        const {access, phone, password} = req.body;
        if (access == 'student') {
            const loggedIn = await StudentLogin(phone, password);
            if (loggedIn.success == false) return res.json({...Success, success: false, message: loggedIn.message});
            const token = await generate({access: 'student', token_type: 'access_token', id: loggedIn._id, expires: Date.now() + 300*300000});
            const refresh_token = await generate({access: 'student', token_type: 'refresh_token', id: loggedIn._id, expires: Date.now() + 300*300000});

            if (token.success == false) return res.json({...Success, success: false, message: 'Error logging into your account'});
            if (refresh_token.success == false) return res.json({...Success, success: false, message: 'Error logging into your account'});

            res.cookie('ParaDemic', refresh_token.token);

            return res.json({
                ...Success,
                message: 'Logged in successfully',
                name: loggedIn.name,
                access_token: token.token
            });
        } else {
            const loggedIn = await TeacherLogin(phone, password);
            if (loggedIn.success == false) return res.json({...Success, success: false, message: loggedIn.message});
            const token = await generate({access: 'teacher', token_type: 'access_token', id: loggedIn._id, expires: Date.now() + 300*300000});
            const refresh_token = await generate({access: 'teacher', token_type: 'refresh_token', id: loggedIn._id, expires: Date.now() + 300*300000});

            if (token.success == false) return res.json({...Success, success: false, message: 'Error logging into your account'});
            if (refresh_token.success == false) return res.json({...Success, success: false, message: 'Error logging into your account'});

            res.cookie('ParaDemic', refresh_token.token);
            return res.json({
                ...Success,
                message: 'Logged in successfully',
                name: loggedIn.name,
                access_token: token.token
            });
        }
    } catch(err) {
        return res.json(ServerError)
    }
}