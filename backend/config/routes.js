const express = require('express');
const router = express.Router();

const logger = require('./winston');

router.use('*', (err, req, res, next) => {
    logger.error({error: err, message: 'An error occured'});
    return res.json(ServerError)
});

module.exports = router;
