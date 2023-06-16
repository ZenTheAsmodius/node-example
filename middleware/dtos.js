const { LoginDTO } = require('../models/dtos/login');
const { CreateUserDTO } = require('../models/dtos/users');
const { ForgotPasswordDTO } = require('../models/dtos/forgot-password');

const useCreateUserDTO = (req, _res, next) => {
  req.body = new CreateUserDTO(req.body);
  next();
};

const useLoginDTO = (req, _res, next) => {
  req.body = new LoginDTO(req.body);
  next();
};

const useForgotPasswordDTO = (req, _res, next) => {
  req.body = new ForgotPasswordDTO(req.body);
  next();
};

module.exports = {
  useCreateUserDTO,
  useLoginDTO,
};
