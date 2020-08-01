const Teacher = require('../models/teacher');
const {verify, hash} = require('../utils/password');
const randomstring = require('randomstring');


module.exports = {
    findByName: async (name) => {
        try {
            const users = await Teacher.find({name:  { $regex: name}}).lean();
            return {success: true, users};
        } catch(err) {
            return {success: false, error: err}
        }
    },
    hasAccessToStudent: async (teacherId, studentId) => {
        try {
            const hasAccess = await Teacher.findOne({_id: teacherId, students: studentId});
            if (hasAccess == null) return false;
            return true;
        } catch (err) {
            return {success: false, error: err}
        }
    },
    loginPassword: async (phone, password) => {
        try {
            const user = await Teacher.findOne({phone}).lean();
            if (user == null) return {success: false, message: 'The phone and password combinations donot match'}
            if (user.hasPassword == false) return {success: false, message: 'Login setup via OTP'}
            const compared = await verify(password, user.password);
            if (compared == false) return {success: false, message: 'The phone and password combinations donot match'}
            return {success: true, ...user};
        } catch(err) {
            return {success: false, error: err}
        }
    },

    generateOTP: async (phone) => {
        try {
            const user = await Teacher.findOne({phone});
            if (user == null) return {success: false, message: 'The phone number is not registered. Try signing up'}
            const otp = randomstring.generate({length: 4, charset: 'numeric'});
            await teacher.findOneAndUpdate({_id: user._id}, {otp: {
                otp: otp,
            }});
            return {success: true, otp}                    
        } catch (err) {
            return {success: false, error: err}
        }
    },

    verifyOTP: async(phone, otp) => {
        try {
            const user = await Teacher.findOne({phone, 'otp.otp': otp});
            if (user == null) return {success: false, message: 'Please enter the correct OTP'};
            return {success: true, ...user}                    
        } catch (err) {
            return {success: false, error: err}
        }
    },

    signup: async (name, phone, password) => {
        try {
            let hasPassword = (password == null || password == '') ? false : true;
            if (password != '') password =  await hash(password);
            let teacher = new Teacher({
                name,
                phone,
                hasPassword,
                password,
                uploads: [],
                students: [],
            });

            teacher = await teacher.save();
            if (teacher == null) return {success: false, message: 'Error adding the user'};
            return {success: true, ...teacher};
        } catch (err) {
            return {success: false, error: err}
        }
    },
 
    getTeacher: async (id) => {
        try {
            const user = await Teacher.findOne({_id: id}).populate({path: 'uploads'})
                .populate({path: 'students', select: 'name'})
                .select('name _id students uploads')
                .lean();
            return {success: true, user};
        } catch (err) {
            return {success: false, error: err}
        }
    },

    getTeacherByPhone: async (phone) => {
        try {
            const teacher = await Teacher.findOne({phone});
            if (teacher == null) return false;
            return true;
        } catch (err) {
            return false;
        }
    }
}