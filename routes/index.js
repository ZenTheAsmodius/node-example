const router = require('express').Router();
const path = require('path');
const api = require('./api');

router.use('/api', api);

router.route('/login').get((_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.route('/signup').get((_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

router.route('/forgot-password').get((_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'forgot-password.html'));
});

router.route('/reset-password').get((_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'reset-password.html'));
});

router.route('/').get((_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
