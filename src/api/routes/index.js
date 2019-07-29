const express = require('express');
const authRouter = require('./auth');
const sleepRouter = require('./sleeps');

const router = express.Router();

router.use('/', authRouter);
router.use('/sleeps', sleepRouter);

module.exports = router;
