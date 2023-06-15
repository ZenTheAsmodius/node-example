const { useCreateUserDTO } = require('../../middleware/dtos');
const usersController = require('../../controllers/users');
const router = require('express').Router();

router.route('/')
  .get(usersController.getAll)
  .post(useCreateUserDTO, usersController.create);

module.exports = router;
