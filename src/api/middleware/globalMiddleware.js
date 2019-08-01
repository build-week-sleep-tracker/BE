const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('../../database/dbConfig.js');
const { cookieSecret } = require('../secrets');

module.exports = (server) => {
  server.use(express.json());
  server.use(cors({
    credentials: true,
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Set-Cookie, Access-Control-Request-Method',
    origin: 'https://bw-sleep-tracker-fe.netlify.com',
  }));
/*   server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Set-Cookie, Access-Control-Request-Method');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  }); */
  server.use(cookieParser());
  server.use(session({
    name: 'sessionID',
    secret: cookieSecret,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
      sameSite: false,
      domain: 'https://bw-sleep-tracker.herokuapp.com',
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