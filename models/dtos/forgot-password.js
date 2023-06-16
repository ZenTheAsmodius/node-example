const { isEmail } = require('../../lib/utils');

class ForgotPasswordDTO {
  constructor({
    email,
  }) {
    this.email = email;
  }

  static validate(dto) {
    if (!isEmail(dto.email)) return false;

    return true;
  }
};

module.exports = {
  ForgotPasswordDTO,
};
