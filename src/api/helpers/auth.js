const bcrypt = require('bcryptjs');
const UsersDB = require('../models/usersModel');

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
};
