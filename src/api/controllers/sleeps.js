const SleepsDB = require('../models/sleepsModel');

async function getAll(req, res) {
  const { user } = req.session;
  try {
    const sleeps = await SleepsDB.findByUser(user.id);
    res.status(200).json(sleeps);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get sleeps" });
  }
}

module.exports = {
  getAll,
}