const usersController = require('../../controllers/users');
const { useLoginDTO } = require('../../middleware/dtos');
const router = require('express').Router();

router.route('/')
  .post(useLoginDTO, usersController.login);

module.exports = router;
