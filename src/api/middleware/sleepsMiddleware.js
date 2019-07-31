const SleepsDB = require('../models/sleepsModel');

async function validateSleep(req, res, next) {
  req.user = req.session.user;
  if (req.params.id) {
    const sleep = await SleepsDB.findById(Number(req.params.id));
    if (sleep.user_id !== req.user.id) {
      res.status(400).json({ error: "Sleep doesn't belong to user" });
      return;
    }
  }

  let { sleep_time, wake_time, score } = req.body;
  if (score) {
    score = Number(score);
    score = score > 4 ? 4 : score;
  }
  if (sleep_time || wake_time || score) {
    req.sleep = {
      user_id: req.user.id,
      sleep_time,
      wake_time,
      score,
    };
  }
  next();
}

module.exports = {
  validateSleep;
}