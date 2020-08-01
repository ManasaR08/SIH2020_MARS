const Search = require('../models/search');
const Student = require('../models/user');

module.exports = {
    addSearch: async (userId, searchQuery, result, type) => {
        try {
            let search = new Search({
                search:searchQuery,
                result,
                type
            });

            search = await search.save();
            if (search == null) return {success: false}
            
            await Student.findOneAndUpdate({_id: userId},{'$push':{searches: search._id}});
            return {success: true, id: search._id};
        } catch (err) {
            return {success: false, error: err, code: 500}
        }
    },
    addTeacher: async (studentId, teacherId) => {
        try {
            await Student.findOneAndUpdate({_id: studentId}, {'$push': {teachers: teacherId}});
            return true;
        } catch (err) {
            return false;
        }
    },

    viewAllTeachers: async (studentId) => {
        try {
            const teachers = await Student.findOne({_id: studentId}).populate({path: 'teachers', select: 'name _id uploads'})
                .select('teachers').lean();

            return {success: true, teachers: teachers.teachers};
        } catch (err) {
            return {success: false, error: err, code: 500}
        }
    },
    viewAllSearches: async (studentId) => {
        try {
            const searches = await Student.findOne({_id: studentId}).populate({path: 'searches'})
                .select('searches').lean();

            return {success: true, searches: searches.searches};
        } catch(er) {
            return {success: false, error: err, code: 500}
        }
    },
    viewAllSuggestions: async (studentId) => {
        try {
            const suggestions = await Student.findOne({_id: studentId}).populate({path: 'suggestions.by', select: 'name _id'})
                .select('suggestions').lean();

            return {success: true, suggestions: suggestions.suggestions};
        } catch(er) {
            return {success: false, error: err, code: 500}
        }
    },

    addSuggestion: async (teacherId, studentId, text) => {
        try {
            await Student.findOneAndUpdate({_id: studentId}, {'$push': {suggestions: {search: text, by: teacherId}}});
            return true;
        } catch (err) {
            return false;
        }
    }
}