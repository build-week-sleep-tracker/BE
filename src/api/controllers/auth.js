const { generateHash, verifyPassword, generateToken } = require('../helpers/auth');
const UserDB = require('../models/usersModel');

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Both email and password are required' });
  } else {
    try {
      const user = await UserDB.findByEmail(email);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else if (await verifyPassword(email, password)) {
        const clientUser = {
          id: user.id,
          email: user.email,
          last_name: user.last_name,
          first_name: user.first_name,
        };
        const token = generateToken(user);
        res.status(200).json({ user: clientUser, token });
      } else {
        res.status(403).json({ error: 'Wrong password' });
      }
    } catch (error) {
      res.status(500).json({ error: "Couln't log user in" });
    }
  }
}

async function register(req, res) {
  const { email, password, last_name, first_name } = req.body;

  if (!email || !password || !last_name || !first_name) {
    res.status(400).json({ error: 'Email, password, first name and last name are required' });
  } else {
    try {
      let user = await UserDB.findByEmail(email);
      if (user) {
        res.status(400).json({ error: 'User already exists with that email' });
      } else {
        const hash = await generateHash(password);
        user = await UserDB.insert({
          email,
          password: hash,
          first_name,
          last_name,
        });
        const clientUser = {
          id: user.id,
          email: user.email,
          last_name: user.last_name,
          first_name: user.first_name,
        };
        const token = generateToken(user);
        res.status(200).json({ user: clientUser, token });
      }
    } catch (error) {
      res.status(500).json({ error: "Couln't register user" });
    }
  }
}

module.exports = {
  login,
  register,
};
