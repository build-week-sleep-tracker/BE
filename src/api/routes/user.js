const router = require('express').Router();
const { restricted } = require('../middleware/authMiddleware');
const { getUser, updateUser, deleteUser } = require('../controllers/user');
const { validateUser } = require('../middleware/userMiddleware');

router.get('/', restricted, getUser);
router.put('/', restricted, validateUser, updateUser);
router.delete('/', restricted, validateUser, deleteUser);

module.exports = router;
