const db = require('../../database/dbConfig');

function findByUser(id) {
  return db('sleeps').where({ user_id: id });
}

function findById(id) {
  return db('sleeps')
    .where({ id })
    .first();
}
async function insert(sleep) {
  const [id] = await db('sleeps')
    .insert(sleep)
    .returning('id');
  return findById(id);
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
