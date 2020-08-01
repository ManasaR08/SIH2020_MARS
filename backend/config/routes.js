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

router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
