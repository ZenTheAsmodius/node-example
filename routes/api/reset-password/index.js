const usersController = require('../../../controllers/users');
const { useResetPasswordDTO } = require('../../../middleware/dtos');
const router = require('express').Router();

router.route('/')
  .post(useResetPasswordDTO, usersController.resetPassword);

module.exports = router;
