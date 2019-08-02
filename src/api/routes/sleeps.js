const router = require('express').Router();
const { restricted } = require('../middleware/authMiddleware');
const { getAll, addSleep, updateSleep, deleteSleep, getRecommenedSleep } = require('../controllers/sleeps');
const { validateSleep } = require('../middleware/sleepsMiddleware');

router.get('/', restricted, getAll);
router.post('/', restricted, validateSleep, addSleep);
router.put('/:id', restricted, validateSleep, updateSleep);
router.delete('/:id', restricted, validateSleep, deleteSleep);
router.get('/recommended', restricted, getRecommenedSleep);

module.exports = router;
