const express = require('express');
const applyMiddleware = require('./middleware/globalMiddleware');

const server = express();
applyMiddleware(server);

module.exports = server;
