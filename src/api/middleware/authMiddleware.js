const jwt = require('jsonwebtoken');
const UsersDB = require('../models/usersModel');
const { jwtSecret } = require('../secrets');

async function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded) throw new Error('Not Valid');
      req.user = await UsersDB.findById(decoded.sub);
      req.user.password = undefined;
      next();
      return;
    } catch (error) {
      res.status(401).json({ error: 'User unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'User unauthorized' });
  }
}

module.exports = {
  restricted,
};
