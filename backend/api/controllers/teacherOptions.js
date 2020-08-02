const Teacher = require('../models/teacher');
const Upload = require('../models/upload');

module.exports = {
    addUpload: async (teacherId, ppt, pdf, name, questionBank) => {
        try {
            let upload = new Upload({
                ppt,
                pdf,
                questionBank,
                name
            });
            upload = await upload.save();
            
            if (upload == null) return {success: false};
            const updated = await Teacher.findOneAndUpdate({_id: teacherId}, {'$push': {uploads: upload._id}});
            return {success: true, id: upload._id};
        } catch (err) {
            return {success: false, error: err}
        }
    },

    deleteUpload: async (teacherId, uploadId) => {
        try {
            await Upload.findOneAndDelete({_id: uploadId});
            await Teacher.findOneAndUpdate({_id: teacherId}, {'$pull': {uploads: uploadId}});
            return true;
        } catch (err) {
            return false;            
        }
    },

    getUploads: async (teacherId) => {
        try {
            const uploads = await Teacher.findOne({_id: teacherId}).populate('uploads');
            if (uploads == null) return {success: false};
            return {success:true, uploads: uploads.uploads}
        }catch(err) {
            return {success:false, error: err}
        }
    },

    viewAllStudents: async (teacherId) => {
        try {
            const students = await Teacher.findOne({_id: teacherId}).populate({path: 'students', select: 'name _id searches'})
                .select('students').lean();

            return {success: true, students: students.students}
        } catch (err) {
            console.log(err);
            return {success: false, error: err}
        }
    },

    addStudent: async (studentId, teacherId) => {
        try {
            await Teacher.findOneAndUpdate({_id: teacherId}, {'$push': {students: studentId}});
            return true;
        } catch (err) {
            return false;
        }
    },

    popularTeachers: async (studentId) => {
        try {
            const teachers = await Teacher.find({students: {$ne: studentId}}).sort({'students': -1}).limit(5).select('name uploads _id');
            return {success: true, teachers: teachers};
        } catch(err) {
            return {success: false, error: err};
        }
    }
}