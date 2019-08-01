const UsersDB = require('../models/usersModel');

async function updateUser(req, res) {
  try {
    const user = await UsersDB.update(req.userFields);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update user" });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UsersDB.update(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete user" });
  }
}

module.exports = {
  updateUser,
  deleteUser,
};
