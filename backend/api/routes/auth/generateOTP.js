const TeacherOTP = require('../../controllers/teacherAuth').generateOTP;
const StudentOTP = require('../../controllers/studentAuth').generateOTP;
const {ServerError, Success} = require('../../responses');
const sendOTP = require('../../utils/sendOTP');

module.exports = async (req, res) => {
    try {
        const {access, phone} = req.body;
        if (access == 'student') {
            const OTP = await StudentOTP(phone);
            if (OTP.success == false) return res.json({...Success, success: false, message: OTP.message});
            // Send OTP
            const otpSent = await sendOTP(OTP.otp, phone);
            if( otpSent == false) return res.json({...Success, success: false, message: 'Error sending OTP to your phone'});
            return res.json({...Success, message: 'OTP has been sent to your registered mobile number'});
        } else {
            const OTP = await TeacherOTP(phone);
            if (OTP.success == false) return res.json({...Success, success: false, message: OTP.message});
            // Send OTP
            const otpSent = await sendOTP(OTP.otp, phone);
            if( otpSent == false) return res.json({...Success, success: false, message: 'Error sending OTP to your phone'});
            
            return res.json({...Success, message: 'OTP has been sent to your registered mobile number'});
        }
    } catch(err) {
        return res.json(ServerError)
    }
}