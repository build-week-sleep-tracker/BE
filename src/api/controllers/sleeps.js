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

async function addSleep(req, res) {
  const { user } = req.session;
  const { sleep_time } = req.body;
  if (!sleep_time) {
    res.status(400).json({ error: 'start_time field is required' });
  }
  try {
    const newSleep = { ...req.body, user_id: user.id };
    const sleep = await SleepsDB.insert(newSleep);
    res.status(201).json(sleep);
  } catch (error) {
    res.status(500).json({ error: "Couldn't add sleep" });
  }
}

module.exports = {
  getAll,
  addSleep,
};
