class ForgotPasswordDTO {
  constructor({
    email,
  }) {
    this.email = email;
  }
};

module.exports = {
  LoginDTO: ForgotPasswordDTO,
};
