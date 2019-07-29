const db = require('../database/dbConfig');

function findByUser(id) {
  return null;
}

function findById(id) {
  return db('sleeps')
    .where({ id })
    .first();
}
async function insert(sleep) {
  return db('sleeps')
    .insert(sleep)
    .then(ids => findById(ids[0]));
}

function getAll() {
  return db('sleeps');
}

async function update(id) {
	return null;
}

async function remove(id) {
	return null;
}

module.exports = {
	insert,
	getAll,
	findById,
	findByUser,
	update,
	remove,
};
