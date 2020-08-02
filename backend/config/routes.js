const express = require('express');
const router = express.Router();

const logger = require('./winston');

const Auth = require('../api/routes/auth');
const Student = require('../api/routes/student');
const Teacher = require('../api/routes/teacher');

const StudentAuth = require('../api/policies/student');
const TeacherAuth = require('../api/policies/teacher');
const upload = require('../api/utils/upload');


router.post('/auth/login', Auth.Login);
router.post('/auth/signup', Auth.Signup);
router.post('/auth/otp/generate', Auth.GenerateOTP);
router.post('/auth/otp/verfy', Auth.VerifyOTP);

router.use('/student', StudentAuth);
router.get('/student/teachers/popular', Student.PopularTeachers);
router.get('/student/search', Student.GetSearches);
router.get('/student/suggestion', Student.GetSuggestions);
router.get('/student/teachers', Student.GetTeachers);
router.post('/student/teachers', Student.AddTeacher);
router.post('/student/teachers/search', Student.SearchTeacher);
router.post('/student/teachers/view', Student.ViewTeacher);
router.post('/student/search', Student.AddSearch);
router.post('/student/result', Student.GetResult);

router.use('/teacher', TeacherAuth);
router.get('/teacher/upload', Teacher.GetUploads);
router.post('/teacher/upload/add', upload.single('pdfDocument'),TeacherAuth ,Teacher.AddUpload);
router.post('/teacher/upload', Teacher.DeleteUpload);
router.get('/teacher/students', Teacher.GetStudents);
router.post('/teacher/students', Teacher.ViewStudent);
router.post('/teacher/students/suggestion', Teacher.AddSuggestion);

router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
