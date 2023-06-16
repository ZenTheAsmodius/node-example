const router = require('express').Router();
const path = require('path');
const login = require('./login');
const users = require('./users');
const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');

router.use('/users', users);
router.use('/login', login);
router.use('/forgot-password', forgotPassword);
router.use('/reset-password', resetPassword);

module.exports = router;
