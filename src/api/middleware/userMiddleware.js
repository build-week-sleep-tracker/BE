const { generateHash } = require('../helpers/auth');

async function validateUser(req, res, next) {
  req.user = req.session.user;

  let { email, password, first_name, last_name } = req.body;
  if (password) {
    password = await generateHash(password);
  }
  if (email || password || first_name || last_name) {
    req.userFields = {
      id: req.user.id,
      email,
      password,
      first_name,
      last_name,
    };
  }
  next();
}

module.exports = {
  validateUser,
};
