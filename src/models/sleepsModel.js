const db = require('../database/dbConfig');

function findByUser(id) {
  return db('sleeps').where({ user_id: id });
}

function findById(id) {
  return db('sleeps')
    .where({ id })
    .first();
}
function insert(sleep) {
  return db('sleeps')
    .insert(sleep)
    .then(ids => findById(ids[0]));
}

function getAll() {
  return db('sleeps');
}

function update(id, fields) {
  return db('sleeps')
    .where({ id })
    .update(fields)
    .then(() => findById(id));
}

async function remove(id) {
  const oldSleep = await findById(id);
  await db('sleeps')
    .where({ id })
    .del();
  return oldSleep;
}

module.exports = {
  insert,
  getAll,
  findById,
  findByUser,
  update,
  remove,
};
