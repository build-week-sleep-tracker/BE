const UsersDB = require('../models/usersModel');

async function getUser(req, res) {
  try {
    const user = await UsersDB.findById(req.session.user.id);
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get user" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await UsersDB.update(req.user.id, req.userFields);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update user" });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UsersDB.remove(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete user" });
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
};
