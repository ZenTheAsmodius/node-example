const router = require('express').Router();
const login = require('./login');
const users = require('./users');
const forgotPassword = require('./forgot-password');

router.use('/users', users);
router.use('/login', login);
router.use('/forgot-password', forgotPassword);

router.route('/').get((_req, res) => res.status(200).json({
  message: 'Welcome!'
}));

module.exports = router;
