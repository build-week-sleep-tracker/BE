const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dbConfig = require('../../database/dbConfig.js');

module.exports = (server) => {
  server.use(express.json());
  server.use(cors());
  server.user(helmet());
}