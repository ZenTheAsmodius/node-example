const { isEmail, areRequiredInObject } = require('../../lib/utils');

class LoginDTO {
  constructor({
    email,
    password,
  }) {
    this.email = email;
    this.password = password;
  }

  static validate(dto) {
    if (!areRequiredInObject(['email', 'password'], dto)) {
      return false;
    }

    if (!isEmail(dto.email)) return false;

    return true;
  }
};

module.exports = {
  LoginDTO,
};
