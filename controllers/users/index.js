const { jwtSign } = require('../../lib/auth');
const { sendForgetPasswordEmail } = require('../../services/mail-service');
const userService = require('../../services/user-service');
const passwordRecoveryService = require('../../services/password-recovery-service');

async function getAll(_req, res, next) {
  try {
    const users = userService.getList();
    return res.status(200).json(users);
  }
  catch (err) {
    return next(err);
  }
};

async function me(req, res) {
  return res.status(200).json(req.claims)
}

async function create(req, res, next) {
  try {
    const { email } = req.body;
    const isRegistered = await userService.isRegisteredWithEmail(email);

    if (isRegistered) {
      return res.sendStatus(409);
    }
    const user = userService.create(req.body);

    return res.status(201).json(user);
  }
  catch (err) {
    return next(err);
  }
};

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.getOneByEmail(email);

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
    const count = await userService.getRecoveryAttemptCountByEmail(email);

    if (count === null) {
      return res.sendStatus(409);
    }

    if (count > RECOVERY_LIMIT) {
      return res.sendStatus(429);
    }

    const passwordRecovery = await passwordRecoveryService.create(req.body);

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

    const pwRecovery = await passwordRecoveryService.getOne({ _id, code });

    if (!pwRecovery) {
      return next({
        status: 422,
        message: 'Invalid entry'
      });
    }

    const user = await userService.getOneByEmail(email);
    if (!user) {
      return res.sendStatus(409);
    }

    user.password = password;
    await user.save();

    await passwordRecoveryService.clean(pwRecovery.email);

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
