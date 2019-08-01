const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersDB = require('../models/usersModel');
const { jwtSecret } = require('../secrets');

function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: '30d',
  };

  return jwt.sign(payload, jwtSecret, options);
}

async function generateHash(password) {
  const hash = await bcrypt.hash(password, 12);
  return hash;
}

async function verifyPassword(email, password) {
  const user = await UsersDB.findByEmail(email);
  return bcrypt.compare(password, user.password);
}

module.exports = {
  generateHash,
  verifyPassword,
  generateToken,
};
