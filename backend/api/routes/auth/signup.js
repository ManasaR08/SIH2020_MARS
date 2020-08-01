const TeacherSignup = require('../../controllers/teacherAuth').signup;
const StudentSignup = require('../../controllers/studentAuth').signup;
const TeacherExists = require('../../controllers/teacherAuth').getTeacherByPhone;
const StudentExists = require('../../controllers/studentAuth').getStudentByPhone;
const {ServerError, Success} = require('../../responses');
const {generate} = require('../../utils/jwt');

module.exports =  async (req, res) => {
    try {
        const {name, access, phone, password} = req.body;
        if (access == 'student') {
            const exists = await StudentExists(phone);
            if (exists == true) return res.json({...Success, success: false, message: 'Phone number already linked to account'});
            const loggedIn = await StudentSignup(name, phone, password);
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
            const exists = await TeacherExists(phone);
            if (exists == true) return res.json({...Success, success: false, message: 'Phone number already linked to account'});
            const loggedIn = await TeacherSignup(name, phone, password);            
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