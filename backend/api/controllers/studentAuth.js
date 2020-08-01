const Student = require('../models/user');
const {verify, hash} = require('../utils/password');
const randomstring = require('randomstring');


module.exports = {
    hasAccessToTeacher: async (studentId, teacherId) => {
        try {
            const hasAccess = await Student.findOne({_id: studentId, teachers: teacherId});
            if (hasAccess == null) return false;
            return true;
        } catch (err) {
            return false;
        }
    },
    loginPassword: async (phone, password) => {
        try {
            const user = await Student.findOne({phone}).lean();
            if (user == null) return {success: false, message: 'The phone and password combinations donot match'}
            if (user.hasPassword == false) return {success: false, message: 'Login setup via OTP'}
            const compared = await verify(password, user.password);
            if (compared == false) return {success: false, message: 'The phone and password combinations donot match'}
            return {success: true, ...user};
        } catch(err) {
            return {success: false, error: err, code: 500}
        }
    },

    generateOTP: async (phone) => {
        try {
            const user = await Student.findOne({phone});
            if (user == null) return {success: false, message: 'The phone number is not registered. Try signing up'}
            const otp = randomstring.generate({length: 4, charset: 'numeric'});
            await Student.findOneAndUpdate({_id: user._id}, {otp: {
                otp: otp,
            }});
            return {success: true, otp}                    
        } catch (err) {
            return {success: false, error: err, code: 500}
        }
    },

    verifyOTP: async(phone, otp) => {
        try {
            const user = await Student.findOne({phone, 'otp.otp': otp});
            if (user == null) return {success: false, message: 'Please enter the correct OTP'};
            return {success: true, ...user}                    
        } catch (err) {
            return {success: false, error: err, code: 500}
        }
    },

    signup: async (name, phone, password) => {
        try {
            let hasPassword = (password == null || password == '') ? false : true;
            if (password != '') password =  await hash(password);
            let student = new Student({
                name,
                phone,
                hasPassword,
                password,
                teachers: [],
                searches: [],
                suggestions: [],
            });

            student = await student.save();
            if (student == null) return {success: false, message: 'Error adding the user'};
            console.log(student)
            return {success: true, ...student};
        } catch (err) {
            return {success: false, error: err, code: 401}
        }
    },

    getStudent: async (id) => {
        try {
            const student = await Student.findOne({_id: id}).populate({path: 'teachers', select: 'name'})
                .populate({path: 'suggestions.by', select: 'name'})
                .populate({path: 'searches', select: '_id search createdAt'})
                .select('name suggestions searches teachers')
                .lean();

            return student;
        } catch (err) {
            return {success: false, error: err, code: 500}
        }
    },

    getStudentByPhone: async (phone) => {
        try {
            const student = await Student.findOne({phone});
            if (student == null) return false;
            return true;
        } catch (err) {
            return false;
        }
    }
}