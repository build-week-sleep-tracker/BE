const db = require('../../database/dbConfig');

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

async function insert(user) {
  const [id] = await db('users')
    .insert(user)
    .returning('id');
  return findById(id);
}

function getAll() {
  return db('users')
    .select(['id', 'email']);
}

function update(id, fields) {
  return db('users')
    .where({ id })
    .update(fields)
    .then(() => findById(id));
}

async function remove(id) {
  const oldUser = await findById(id);
  await db('users')
    .where({ id })
    .del();
  return oldUser;
}

module.exports = {
  insert,
  getAll,
  findById,
  findByEmail,
  update,
  remove,
};
