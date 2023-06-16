const { areRequiredInObject } = require('../../lib/utils');

class ResetPasswordDTO {
  constructor({
    code,
    _id,
    password
  }) {
    this._id = _id;
    this.code = code;
    this.password = password;
  }

  static validate(dto) {
    if (!areRequiredInObject(['code', '_id', 'password'], dto)) {
      return false;
    }

    if (dto.password.length < 8) return false;

    return true;
  }
};

module.exports = {
  ResetPasswordDTO,
};
