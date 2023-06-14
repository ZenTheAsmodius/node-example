"use strict";
require('dotenv').config();
const { PORT, NODE_ENV } = require('./config');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Environment: ${NODE_ENV}`)
  console.log(`Server is listening on port ${PORT}!`)
});
