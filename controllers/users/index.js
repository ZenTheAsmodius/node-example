const User = require('../../models/schemas/User');
const { jwtSign } = require('../../lib/auth');

async function getAll(req, res, next) {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  }
  catch (err) {
    return next(err);
  }
};

async function create(req, res, next) {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json(user);
  }
  catch (err) {
    return next(err);
  }
};

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const INVALID_CREDENTIALS = {
      status: 422,
      message: 'Invalid credentials',
    };

    if (!user) return next(INVALID_CREDENTIALS);
    if (!user.checkPassword(password)) return next(INVALID_CREDENTIALS)

    const access_token = jwtSign(user.getClaims())
    return res.status(200).json({ access_token })
  }
  catch (err) {
    return next(err)
  }
};

async function logout(req, res, next) {
  res.sendStatus(501);
};

async function forgotPassword(req, res, next) {
  res.sendStatus(501);
};

module.exports = {
  getAll,
  create,
  login,
  logout,
  forgotPassword
};
