const router = require('express').Router();
const login = require('./login');
const users = require('./users');

router.use('/users', users);
router.use('/login', login);

router.route('/').get((_req, res) => res.status(200).json({
  message: 'Welcome!'
}));

module.exports = router;
