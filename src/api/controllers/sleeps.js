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
  if (!req.sleep.sleep_time) {
    res.status(400).json({ error: 'start_time field is required' });
  } else {
    try {
      const sleep = await SleepsDB.insert(req.sleep);
      res.status(201).json(sleep);
    } catch (error) {
      res.status(500).json({ error: "Couldn't add sleep" });
    }
  }
}

async function updateSleep(req, res) {
  try {
    const sleep = await SleepsDB.update(req.sleep);
    res.status(200).json(sleep);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update sleep" });
  }
}

async function deleteSleep(req, res) {
  const { user } = req.session;
  let sleep = await SleepsDB.findById(Number(req.params.id));
  if (sleep.user_id !== user.id) {
    res.status(400).json({ error: "Sleep doesn't belong to user" });
  } else {
    try {
      sleep = await SleepsDB.remove(sleep.id);
      res.status(200).json(sleep);
    } catch (error) {
      res.status(500).json({ error: "Couldn't delete sleep"});
    }
  }
}

module.exports = {
  getAll,
  addSleep,
  updateSleep,
  deleteSleep,
};
