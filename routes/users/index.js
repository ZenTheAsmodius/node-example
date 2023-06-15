const { useCreateUserDTO } = require('../../middleware/dtos');
const { isAuthenticated } = require('../../middleware/auth');
const usersController = require('../../controllers/users');
const router = require('express').Router();

router.route('/')
  .get(isAuthenticated, usersController.getAll)
  .post(useCreateUserDTO, usersController.create);

module.exports = router;
