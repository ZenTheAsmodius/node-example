const { LoginDTO } = require('../models/dtos/login');
const { CreateUserDTO } = require('../models/dtos/users');

const useCreateUserDTO = (req, _res, next) => {
  req.body = new CreateUserDTO(req.body);
  next();
};

const useLoginDTO = (req, _res, next) => {
  req.body = new LoginDTO(req.body);
  next();
};

module.exports = {
  useCreateUserDTO,
  useLoginDTO,
};
