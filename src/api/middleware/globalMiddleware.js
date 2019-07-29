const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('../../database/dbConfig.js');
const { cookieSecret } = require('../secrets');

module.exports = (server) => {
  server.use(express.json());
  server.use(helmet());
  server.use(cors());
  server.use(session({
    name: 'sessionID',
    secret: cookieSecret,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: dbConfig, // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60,
    }),
  }));
}