"use strict";
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('tiny'));

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', _req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'set-cookies');
  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
