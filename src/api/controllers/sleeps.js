const SleepsDB = require('../models/sleepsModel');

async function getAll(req, res) {
  try {
    const sleeps = await SleepsDB.findByUser(req.user.id);
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
    const sleep = await SleepsDB.update(Number(req.params.id) ,req.sleep);
    res.status(200).json(sleep);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update sleep" });
  }
}

async function deleteSleep(req, res) {
  let sleep = await SleepsDB.findById(Number(req.params.id));
  try {
    sleep = await SleepsDB.remove(sleep.id);
    res.status(200).json(sleep);
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete sleep" });
  }
}

async function getRecommenedSleep(req, res) {
  try {
    const sleeps = await SleepsDB.getTop(req.user.id, 10);
    let count = 0;
    let totalTime = 0;
    sleeps.forEach(sleep => {
      if(sleep.sleep_time && sleep.wake_time) {
        const start = new Date(sleep.sleep_time);
        const end = new Date(sleep.wake_time);
        const delta = end.getTime() - start.getTime();
        totalTime += delta;
        count++;
      }
    })
    const avg = totalTime / count;
    res.status(200).json({ average: avg });
  } catch (error) {
    res.status(500).json({ error: "Couldn't get recommendation" });
  }
}

module.exports = {
  getAll,
  addSleep,
  updateSleep,
  deleteSleep,
  getRecommenedSleep,
};
