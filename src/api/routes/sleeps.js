const router = require('express').Router();
const { getAll } = require('../controllers/sleeps');

router.post('/', getAll);

module.exports = router;
