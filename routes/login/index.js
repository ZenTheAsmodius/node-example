const usersController = require('../../controllers/users');
const router = require('express').Router();

router.route('/')
  .get(usersController.login);

module.exports = router;
