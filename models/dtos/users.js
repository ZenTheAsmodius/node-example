const { isEmail, areRequiredInObject } = require('../../lib/utils');

class CreateUserDTO {
  constructor({
    full_name,
    email,
    password,
  }) {
    this.full_name = full_name;
    this.email = email;
    this.password = password;
  }

  static validate(dto) {
    if (!areRequiredInObject(['email', 'full_name', 'password'], dto)) {
      return false;
    }
    if (!isEmail(dto.email)) return false;

    if (dto.password.length < 8) return false;

    return true;
  }
};

module.exports = {
  CreateUserDTO,
};
