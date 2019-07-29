const knex = require('knex');

const ENV = process.env.DB_ENV || 'development';
const dbConfig = knex(require('../../knexfile')[ENV]);

module.exports = dbConfig;
