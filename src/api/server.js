const express = require('express');
const applyMiddleware = require('./middleware/globalMiddleware');
const routes = require('./routes');

const server = express();
applyMiddleware(server);
server.use('/api', routes);

module.exports = server;
