const express = require('express');
const authRouter = require('./auth');
const sleepRouter = require('./sleeps');
const userRouter = require('./user');

const router = express.Router();

router.use('/', authRouter);
router.use('/sleeps', sleepRouter);
router.use('/user', userRouter);

module.exports = router;
