const { generateHash, verifyPassword } = require('../helpers/auth');
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
        const clientUser = { id: user.id, email: user.email };
        req.session.user = clientUser;
        res.status(200).json({ user: clientUser });
      } else {
        res.status(403).json({ error: 'Wrong password' });
      }
    } catch (error) {
      res.status(500).json({ error: "Couln't log user in" });
    }
  }
}
