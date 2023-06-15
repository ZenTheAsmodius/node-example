const User = require('../../models/schemas/User');

async function getAll(req, res, next) {
  res.sendStatus(501);
};

async function create(req, res, next) {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json(user);
  }
  catch (e) {
    return next(e);
  }
};

async function login(req, res, next) {
  res.sendStatus(501);
};

async function logout(req, res, next) {
  res.sendStatus(501);
};

async function resetPassword(req, res, next) {
  res.sendStatus(501);
};

module.exports = {
  getAll,
  create,
  login,
  logout,
  resetPassword
};
