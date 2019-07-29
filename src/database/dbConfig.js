require('dotenv').config();
const knex = require('knex');

const ENV = process.env.ENV || 'development';
const dbConfig = knex(require('../../knexfile')[ENV]);

module.exports = dbConfig;
