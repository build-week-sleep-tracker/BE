const router = require('express').Router();
const { restricted } = require('../middleware/authMiddleware');
const { getAll, addSleep } = require('../controllers/sleeps');

router.get('/', restricted, getAll);
router.post('/', restricted, addSleep);

module.exports = router;
