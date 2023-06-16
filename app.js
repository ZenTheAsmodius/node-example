const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'set-cookies');
  next();
});

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, './public')))

app.use('/', router);

// 404 Handler
app.use((_req, _res, next) => {
  let error = new Error('Not Found');
  error.status = 404;
  return next(error);
});

// Error Handler
app.use((err, _req, res, next) => {
  if (!err.status) {
    err = Object.assign({}, err, {
      message: err.message || undefined
    }, {
      stack: err.stack || undefined
    }, {
      status: 500
    });
  }
  if (err.status && [401, 403, 404].indexOf(err.status) == -1) {
    console.error(err);
  }

  res.status(err.status).json({
    message: err.message || undefined,
    status: err.status || undefined,
    errors: err.errors || undefined
  })
});

module.exports = app;
