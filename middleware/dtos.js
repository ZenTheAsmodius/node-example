const { LoginDTO } = require('../models/dtos/login');
const { CreateUserDTO } = require('../models/dtos/users');
const { ForgotPasswordDTO } = require('../models/dtos/forgot-password');
const { ResetPasswordDTO } = require('../models/dtos/reset-password');

const useCreateUserDTO = (req, _res, next) => {
  if (!CreateUserDTO.validate(req.body)) {
    return next({
      status: 422,
      message: 'Invalid user payload'
    });
  }
  req.body = new CreateUserDTO(req.body);
  next();
};

const useLoginDTO = (req, _res, next) => {
  if (!LoginDTO.validate(req.body)) {
    return next({
      status: 422,
      message: 'Invalid Credentials'
    });
  }
  req.body = new LoginDTO(req.body);
  next();
};

const useForgotPasswordDTO = (req, _res, next) => {
  if (!ForgotPasswordDTO.validate(req.body)) {
    return next({
      status: 422,
      message: 'Invalid email'
    })
  }
  req.body = new ForgotPasswordDTO(req.body);
  next();
};

const useResetPasswordDTO = (req, _res, next) => {
  if (!ResetPasswordDTO.validate(req.body)) {
    return next({
      status: 422,
      message: 'Invalid payload'
    })
  }
  req.body = new ResetPasswordDTO(req.body);
  next();
};

module.exports = {
  useCreateUserDTO,
  useLoginDTO,
  useForgotPasswordDTO,
  useResetPasswordDTO
};
