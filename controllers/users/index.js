const User = require('../../models/schemas/User');
const { jwtSign } = require('../../lib/auth');
const PasswordRecovery = require('../../models/schemas/PasswordRecovery');
const { sendForgetPasswordEmail } = require('../../services/mail-service');

async function getAll(req, res, next) {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  }
  catch (err) {
    return next(err);
  }
};

async function me(req, res, next) {
  return res.status(200).json(req.claims)
}

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
  const RECOVERY_LIMIT = 5;
  try {
    const { email } = req.body;
    const [{ count = 0 }] = await User.aggregate([
      {
        $match: { email }
      },
      {
        $lookup: {
          from: 'password-recovery',
          localField: 'email',
          foreignField: "email",
          as: "rec"
        }
      },
      {
        $project: {
          count: { $size: "$rec" },
          _id: 0
        }
      }
    ]).exec();

    if (count > RECOVERY_LIMIT) {
      return res.sendStatus(429);
    }

    const passwordRecovery = new PasswordRecovery(req.body);

    await passwordRecovery.save();

    const redirect_uri = `${req.headers.origin}/reset-password?code=${passwordRecovery.code}&id=${passwordRecovery._id}`;
    sendForgetPasswordEmail(email, redirect_uri);
    return res.sendStatus(202);
  }
  catch (err) {
    return next(err)
  }
};

async function resetPassword(req, res, next) {
  try {
    const { code, _id, password } = req.body;

    const pwRecovery = await PasswordRecovery.findOne({ _id, code });

    if (!pwRecovery) {
      return next({
        status: 422,
        message: 'Invalid entry'
      });
    }

    const user = await User.findOne({email: pwRecovery.email});
    if (!user) {
      return next({
        status: 409,
        message: 'Conflict'
      });
    }

    user.password = password;
    await user.save();

    await PasswordRecovery.deleteMany({email: pwRecovery.email});
    
    return res.sendStatus(204);
  }
  catch (err) {
    return next(err)
  }
}

module.exports = {
  getAll,
  me,
  create,
  login,
  logout,
  forgotPassword,
  resetPassword
};
