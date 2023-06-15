const { jwtVerify } = require('../lib/auth');

const isAuthenticated = async (req, _res, next) => {
  const token = getBearerFromRequest(req);

  if (token == null) return next({
    status: 401
  });

  try {
    const claims = await jwtVerify(token);
    req.claims = claims;
    return next();
  }
  catch (e) {
    next({
      status: 401
    });
  }
};

function getBearerFromRequest(req) {
  if (req == null || req.headers == null || req.headers.authorization == null) return null;
  const splitted = req.headers.authorization.split(' ');
  if (splitted[0] != 'Bearer') return null;
  if (splitted[1] == null) return null;
  return splitted[1];
}

module.exports = {
  isAuthenticated,
};
