const usersController = require('../../controllers/users');
const { useForgotPasswordDTO } = require('../../middleware/dtos');
const router = require('express').Router();

router.route('/')
  .post(useForgotPasswordDTO, usersController.forgotPassword);

module.exports = router;
