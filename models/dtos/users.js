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
};

module.exports = {
  CreateUserDTO,
};
