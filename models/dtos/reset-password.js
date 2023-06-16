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
};

module.exports = {
  ResetPasswordDTO,
};
